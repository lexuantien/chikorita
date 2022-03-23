export const getBrowser = () => {
  switch (navigator.appName) {
    case "Opera":
      return "opera";
    case "Microsoft Internet Explorer":
      return "msie";
    case "Netscape": {
      const re = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");
      if (re.exec(navigator.userAgent) !== null) {
        return "msie";
      }
    }
    /* falls through */
    default:
      if (navigator.vendor.match(/Google Inc./i) !== null) {
        return "chrome";
      } else if (navigator.vendor.match(/Apple Computer, Inc./i) !== null) {
        if (navigator.userAgent.match(/iPad/i) !== null) {
          return "ipad";
        } else if (navigator.userAgent.match(/iPhone/i) !== null) {
          return "iphone";
        }
        return "safari";
      } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
        return "firefox";
      } else if (navigator.userAgent.indexOf("Edge") !== -1) {
        return "edge";
      }
  }
  return "unknown";
};

export const getBrowserVersion = () => {
  const browser = getBrowser();
  if (browser === "unknown") {
    return 0;
  }
  const reExec = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})").exec(
    navigator.userAgent
  );
  if (
    browser === "msie" &&
    reExec !== null &&
    reExec[1] &&
    reExec[1].split(".")[0]
  ) {
    return parseInt(reExec[1].split(".")[0], 10);
  }
  const searchString = {
    chrome: "Chrome",
    safari: "Version",
    ipad: "Version",
    iphone: "Version",
    opera: "Version",
    firefox: "Firefox",
    msie: "MSIE",
    edge: "Edge",
  };
  return parseFloat(
    navigator.userAgent.substring(
      navigator.userAgent.indexOf(searchString[browser]) +
        searchString[browser].length +
        1
    )
  );
};
