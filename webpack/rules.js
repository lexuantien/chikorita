const path = require("path");
const { ROOT_DIR } = require("./env");
const {
  babelLoader,
  miniCssExtractLoader,
  cssLoader,
  styleLoader,
  postCssLoader,
  tsLoader,
} = require("./loaders");

const javascriptRule = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  include: path.join(ROOT_DIR, "/src"),
  use: babelLoader,
};
const StylexPlugin = require("@ladifire-opensource/stylex-webpack-plugin");
const typescriptRule = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: [
    {
      loader: StylexPlugin.loader,
      options: {
        inject: false,
      },
    },
    {
      loader: "@griffel/webpack-loader",
    },
    {
      loader: "ts-loader",
      options: {
        transpileOnly: true,
      },
    },
  ],
};

const fontsRule = {
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  type: "asset/resource",
};

const imagesRule = {
  test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
  type: "asset",
};

const svgReactComponentRule = {
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  issuer: /\.[jt]sx$/,
  use: [
    {
      loader: "@svgr/webpack",
      options: {
        babel: false,
        icon: true,
      },
    },
  ],
};

const svgRule = {
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  issuer: { not: [/\.[jt]sx$/] },
  type: "asset/inline",
};

const cssRule = {
  test: /\.(s?)css$/,
  use: [
    // Do not use together style-loader and mini-css-extract-plugin.
    // devMode ? "style-loader" : MiniCssExtractPlugin.loader,
    // plugins: [].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
    miniCssExtractLoader,
    // styleLoader,
    cssLoader,
    postCssLoader(),
    // according to the docs, sass-loader should be at the bottom, which
    // loads it first to avoid prefixes in your sourcemaps and other issues.
    "sass-loader",
  ],
  sideEffects: true,
};

module.exports = {
  javascriptRule,
  typescriptRule,
  fontsRule,
  imagesRule,
  svgReactComponentRule,
  svgRule,
  cssRule,
};
