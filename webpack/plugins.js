const { ROOT_DIR } = require("./env");

const path = require("path");
const glob = require("glob");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin"); // use inside the npm package
const WebpackNotifierPlugin = require("webpack-notifier");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackPluginServe } = require("webpack-plugin-serve");
const { DefinePlugin, BannerPlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { GitRevisionPlugin } = require("git-revision-webpack-plugin");

const PATH = path.join(ROOT_DIR, "/src");

const caseSensitivePathsPlugin = new CaseSensitivePathsPlugin();

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(ROOT_DIR, "./src/index.html"),
  filename: "index.html",
  inject: true,
});

const webpackNotifierPlugin = new WebpackNotifierPlugin({
  title: function (params) {
    return `Build status is ${params.status} with message ${params.message}`;
  },
});

const miniCssExtactPlugin = new MiniCssExtractPlugin({
  filename: "[name].css",
});

const purgeCssPlugin = new PurgeCSSPlugin({
  paths: glob.sync(`${PATH}/**/*`, { nodir: true }), // Consider extracting as a parameter
  extractors: [
    {
      extractor: (content) => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
      extensions: ["html"],
    },
  ],
});

const webpackPluginServe = new WebpackPluginServe({
  port: process.env.PORT || 8080,
  static: path.join(ROOT_DIR, "/dist"),
  static: "./dist", // Expose if output.path changes
  liveReload: true,
  waitForBuild: true,
  historyFallback: true,
});

const mode = process.env.NODE_ENV ?? "production";
const definePlugin = new DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify(mode),
});

// const providePlugin = new ProvidePlugin();

const cleanWebpacklugin = new CleanWebpackPlugin();

const esLintPlugin = new ESLintWebpackPlugin({
  context: path.join(ROOT_DIR, "/src"),
  extensions: ["js", "jsx", "ts", "tsx"],
});

// const forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin({
//   async: process.env.MODE === "development" ? true : false,
//   typescript: {
//     configFile: path.join(ROOT_DIR, "/tsconfig.json"),
//   },
// });

const reactRefreshPlugin = new ReactRefreshWebpackPlugin();

const attachRevisionPlugin = new BannerPlugin({
  banner: new GitRevisionPlugin().version(),
});

module.exports = {
  htmlWebpackPlugin,
  caseSensitivePathsPlugin,
  webpackNotifierPlugin,
  purgeCssPlugin,
  miniCssExtactPlugin,
  webpackPluginServe,
  definePlugin,
  // providePlugin,
  cleanWebpacklugin,
  esLintPlugin,
  reactRefreshPlugin,
  attachRevisionPlugin,
  // forkTsCheckerWebpackPlugin,
};
