const {
  purgeCssPlugin,
  cleanWebpacklugin,
  attachRevisionPlugin,
} = require("./plugins");

const { splitChunks, minifyJTS, minifyCss } = require("./optimizations");

const productionConfig = {
  plugins: [purgeCssPlugin, attachRevisionPlugin /*cleanWebpacklugin*/],

  optimization: {
    splitChunks,
    minimizer: [minifyJTS, minifyCss({ options: { preset: ["default"] } })],
  },
};

module.exports = productionConfig;
