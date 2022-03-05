const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const splitChunks = {
    minSize: { javascript: 20000, "css/mini-extra": 10000 },
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: "vendor",
        chunks: "initial",
      },
    },
};

const minifyJTS = new TerserPlugin();
const minifyCss = ({ options }) =>
  new CssMinimizerPlugin({ minimizerOptions: options });

module.exports = {
  splitChunks,
  minifyJTS,
  minifyCss
};
