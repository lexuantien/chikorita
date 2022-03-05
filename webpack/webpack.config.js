const { mode } = require("webpack-nano/argv");

const { merge } = require("webpack-merge");

const commonConfig = require("./common");
const prodConfig = require("./prod");
const devConfig = require("./dev");

// const a = merge(commonConfig, devConfig, { mode });
// console.log(a.entry);

const getConfig = (mode) => {
  switch (mode) {
    case "production":
      return merge(commonConfig, prodConfig, { mode });
    case "development":
      return merge(commonConfig, devConfig, { mode });
    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`);
  }
};

module.exports = getConfig(mode);
