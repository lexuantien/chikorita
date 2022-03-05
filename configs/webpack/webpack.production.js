const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");

const productionConfig = merge([parts.eliminateUnusedCSS()]);
module.exports = productionConfig;