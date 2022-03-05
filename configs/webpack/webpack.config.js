const { mode } = require("webpack-nano/argv");

const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common");
const productionConfig = require("./webpack.production");
const developmentConfig = require("./webpack.development");

// const a = merge(commonConfig, developmentConfig, { mode });

// console.log(a.module.rules[0]);

const getConfig = (mode) => {
  switch (mode) {
    case "production":
      return merge(commonConfig, productionConfig, { mode });
    case "development":
      return merge(commonConfig, developmentConfig, { mode });
    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`);
  }
};

module.exports = getConfig(mode);
