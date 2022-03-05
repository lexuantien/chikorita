const path = require("path");
const { ROOT_DIR } = require("./env");
const { alias } = require("./alias");
const {
  htmlWebpackPlugin,
  miniCssExtactPlugin,
  definePlugin,
  esLintPlugin,
  forkTsCheckerWebpackPlugin,
} = require("./plugins");
const {
  javascriptRule,
  fontsRule,
  imagesRule,
  svgReactComponentRule,
  svgRule,
  cssRule,
  typescriptRule,
} = require("./rules");
const commonConfig = {
  context: __dirname,

  entry: [path.join(ROOT_DIR, "/src/iss.ts")],

  output: {
    path: path.join(ROOT_DIR, "/dist"),
    publicPath: "/",
    // filename: "[name].bundle.js",
    // assetModuleFilename: "images/[hash][ext][query]",
    clean: true,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias,
  },

  plugins: [
    htmlWebpackPlugin,
    miniCssExtactPlugin,
    definePlugin,
    esLintPlugin,
    // forkTsCheckerWebpackPlugin,
  ],

  module: {
    rules: [
      typescriptRule,
      javascriptRule,
      fontsRule,
      imagesRule,
      svgReactComponentRule,
      svgRule,
      cssRule,
    ],
  },
};

module.exports = commonConfig;
