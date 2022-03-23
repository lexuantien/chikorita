/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBrowser, getBrowserVersion } from "./broswer";
import { post } from "./fetch";

const localLog = {
  info: "info",
  notice: "log",
  warning: "warn",
  error: "error",
  debug: "log",
};

/* eslint-disable no-bitwise */
const stringToHashInt = (s: string) => {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

const intToRGB = (i: number) => {
  let hex =
    ((i >> 24) & 0xff).toString(16) +
    ((i >> 16) & 0xff).toString(16) +
    ((i >> 8) & 0xff).toString(16) +
    (i & 0xff).toString(16);
  hex += "000000";
  return hex.substring(0, 6);
};

/* eslint-enable no-bitwise */
const invertColor = (hex: string) => {
  // invert color components
  const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16);
  const g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16);
  const b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  return `${r.padStart(2, "0")}${g.padStart(2, "0")}${b.padStart(2, "0")}`;
};

// const getScriptUrls = () => {
//   const scripts = document.getElementsByTagName('script');
//   return Array.prototype.map.call(scripts, (script) => script.src).filter((script) => !!script);
// };

const addNavigatorData = (data: any) => {
  Object.assign(data, {
    browser: getBrowser(),
    browser_version: getBrowserVersion(),
    language: navigator.language,
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    url: location.href,
    // scriptUrls: getScriptUrls().join('\n'),
  });
};

export type logType = "debug" | "log" | "error" | "info" | "warn";

export default class Logger {
  module: string;
  subModule: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  baseData: {};
  moduleName: string;
  textColor: string;
  backgroundColor: string;
  constructor(module: string, subModule = "", baseData = {}) {
    this.module = module;
    this.subModule = subModule;
    this.baseData = baseData;
    this.moduleName = [module, subModule].filter((m) => !!m).join(":");
    this.textColor = intToRGB(stringToHashInt(this.moduleName));
    this.backgroundColor = invertColor(this.textColor);
    if (subModule) {
      Object.assign(this.baseData, { subModule });
    }
  }
  logFunction(func: logType, ...args: any) {
    let allowedModules;
    try {
      allowedModules =
        window.localStorage &&
        JSON.parse(window.localStorage.getItem("log") || "{}");
    } catch (error) {
      allowedModules = [];
    }
    if (
      func !== "error" &&
      (!Array.isArray(allowedModules) || !allowedModules.includes(this.module))
    ) {
      return;
    }
    window.console &&
      window.console[func](
        `%c ${this.moduleName} `,
        `background: #${this.backgroundColor}; color: #${this.textColor}`,
        ...args
      );
  }
  log(...args: any) {
    this.logFunction("log", ...args);
  }
  log2(...args: any) {
    this.log(...args);
  }
  info(...args: any) {
    this.logFunction("info", ...args);
  }
  warn(...args: any) {
    this.logFunction("warn", ...args);
  }
  error(...args: any) {
    this.logFunction("error", ...args);
  }

  remote(level: logType, message: any, data = {}, facility = null) {
    const payload = {
      facility: facility || this.module,
      message,
      data: Object.assign(Object.assign({}, data), this.baseData),
    };

    switch (localLog[level as keyof typeof localLog]) {
      case "info":
        this.info(payload);
        break;
      case "log":
        this.log(payload);
        break;
      case "warn":
        this.warn(payload);
        break;
      case "error":
        this.error(payload);
        break;
    }
    post(`/api/v1/logs/${level}`, payload, { cache: "no-cache" }).catch(
      (error) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        selfLogger.warn("log.remote failed", error);
      }
    );
  }

  logError(
    error: ErrorEvent | Error | string | number,
    message: any = undefined,
    level: logType = "error",
    extraData = {},
    facility: any = undefined
  ) {
    let _a, _b;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = {};
    if (error instanceof ErrorEvent) {
      Object.assign(data, {
        error_message:
          (_a = error.error) === null || _a === undefined
            ? undefined
            : _a.message,
        file: error.filename,
        line: error.lineno,
        col: error.colno,
        stack:
          (_b = error.error) === null || _b === undefined
            ? undefined
            : _b.stack,
      });
    } else if (error instanceof Error) {
      Object.assign(data, {
        error_message: error.message,
        stack: error.stack,
      });
    } else {
      Object.assign(data, {
        error_message: error,
      });
    }
    addNavigatorData(data);
    Object.assign(data, extraData);
    this.remote(level, message || data.error_message, data, facility);
  }
}

const selfLogger = new Logger("logger");
