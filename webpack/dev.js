const {
  caseSensitivePathsPlugin,
  webpackNotifierPlugin,
  webpackPluginServe,
  reactRefreshPlugin,
} = require("./plugins");

const devConfig = {
  entry: ["webpack-plugin-serve/client"],

  watch: true,

  plugins: [
    reactRefreshPlugin,
    webpackPluginServe,
    caseSensitivePathsPlugin,
    webpackNotifierPlugin,
  ],
};

module.exports = devConfig;
