const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");

 const developmentConfig = merge([
  { entry: ["webpack-plugin-serve/client"] },
  parts.devServer(),
  parts.anotherPlugins(),
]);
module.exports = developmentConfig;