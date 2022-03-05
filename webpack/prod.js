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
    hints: "warning", // "error" or false are valid too
    maxEntrypointSize: 50000, // in bytes, default 250k
    maxAssetSize: 100000, // in bytes
  },
};

module.exports = productionConfig;
