/* eslint-disable @typescript-eslint/no-explicit-any */
import ExecutionEnvironment from "@helpers/environment";

import { formatDate } from "@helpers/dateUtils";

if (
  ExecutionEnvironment.canUseDOM &&
  (typeof window.console === "undefined" ||
    window.console.log === undefined ||
    window.console.debug === undefined ||
    window.console.error === undefined)
) {
  // polyfill
  window.console = window.console || {};
  window.console.log = () => {
    /**/
  };
  window.console.debug = () => {
    /**/
  };
  window.console.error = () => {
    /**/
  };
}

function logToErrCgi(name: Event | string, trace: number | undefined) {
  if (window && typeof window.onerror === "function") {
    window.onerror(name, window.location.href, trace);
  }
}

type logType = "debug" | "log" | "error";

function modifyLogCall(
  logFunc: logType,
  clientOrServer: string,
  ...args: any
) {

  // console[logFunc].apply(console,[clientOrServer].concat(Array.prototype.slice.call(args)));

  console[logFunc](clientOrServer,...args);
}

function getClientLogger(logFunc: logType) {
  return function (...args: any) {
    modifyLogCall(logFunc, "Marty Client:", ...args);
  };
}

function getServerLogger(logFunc: logType) {
  const env = process.env.MARTY_EB_ENV || "unset";
  if (process.env.NODE_ENV === "test") {
    return () => null;
  }
  // needs to be function rather than fat arrow or else `arguments` get lost
  return function (...args: any) {
    const timestamp = formatDate("DD/MMM/YYYY:HH:mm:ss.ms ZZ");
    const loggingPrefix = `[${timestamp}] martyenv=${env}`;
    modifyLogCall(logFunc, loggingPrefix, ...args);
  };
}

const logger = ExecutionEnvironment.canUseDOM
  ? getClientLogger("log")
  : getServerLogger("log");
export const logError = ExecutionEnvironment.canUseDOM
  ? getClientLogger("error")
  : getServerLogger("error");
export const logDebug = ExecutionEnvironment.canUseDOM
  ? getClientLogger("debug")
  : getServerLogger("debug");
export const logToServer = ExecutionEnvironment.canUseDOM
  ? logToErrCgi
  : logError;

export const logErrorAndLogToServer = (...error: any) => {
  logError(...error);
  // logToServer(error);
};
