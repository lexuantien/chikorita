const {
  purgeCssPlugin,
  cleanWebpacklugin,
  attachRevisionPlugin,
  obfuscatorPlugin,
} = require("./plugins");

const { splitChunks, minifyJTS, minifyCss } = require("./optimizations");

const productionConfig = {
  plugins: [
    purgeCssPlugin,
    attachRevisionPlugin,
    obfuscatorPlugin /*cleanWebpacklugin*/,
  ],

  output: {
    chunkFilename: "[name].[contenthash].js",
    filename: "[name].[contenthash].js",
    assetModuleFilename: "[name].[contenthash][ext][query]",
  },

  optimization: {
    splitChunks: splitChunks,
    runtimeChunk: { name: "runtime" },
    minimizer: [minifyJTS, minifyCss({ options: { preset: ["default"] } })],
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

module.exports = productionConfig;
