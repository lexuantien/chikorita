const {
  caseSensitivePathsPlugin,
  webpackNotifierPlugin,
  webpackPluginServe,
  reactRefreshPlugin,
} = require("./plugins");

const devConfig = {
  entry: ["webpack-plugin-serve/client"],

  devtool: "source-map",

  watch: true,

  stats: {
    errorDetails: true,
    children: true,
  },

  plugins: [
    reactRefreshPlugin,
    webpackPluginServe,
    caseSensitivePathsPlugin,
    webpackNotifierPlugin,
  ],
};

module.exports = devConfig;
