const path = require("path");
const { ROOT_DIR } = require("./env");
const { alias } = require("./alias");
const {
  htmlWebpackPlugin,
  miniCssExtactPlugin,
  definePlugin,
  esLintPlugin,
  forkTsPlugin,
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

const { externalItems } = require("./externals");
const StylexPlugin = require("@ladifire-opensource/stylex-webpack-plugin");
const commonConfig = {
  context: ROOT_DIR,

  entry: [path.join(ROOT_DIR, "/src/index.tsx")],

  output: {
    path: path.join(ROOT_DIR, "/dist"),
    publicPath: "/",
    // filename: "[name].bundle.js",
    // assetModuleFilename: "images/[hash][ext][query]",
    clean: true,
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
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
    forkTsPlugin,
    new StylexPlugin(),
  ],

  externals: externalItems,

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
