const { merge } = require("webpack-merge");

const commonConfig = require("./webpackCommonConf");
const prodConfig = require("./webpackProdConf");
const devConfig = require("./webpackDevConf");

// const a = merge(commonConfig, devConfig, { mode });
// console.log(a.entry);

const getConfig = (env, args) => {
  console.log(env, args);
  switch (args.mode) {
    case "production":
      return merge(commonConfig, prodConfig, { mode: args.mode });
    case "development":
      return merge(commonConfig, devConfig, { mode: args.mode });
    default:
      throw new Error(`Trying to use an unknown mode, ${env}`);
  }
};

module.exports = getConfig;
