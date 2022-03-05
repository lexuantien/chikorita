const path = require("path");
const { merge } = require("webpack-merge");

const parts = require("./webpack.parts");

const cssLoaders = [parts.autoprefix(), "sass-loader" /*, parts.tailwind()*/];

const commonConfig = merge([
  { entry: ["./src/index.js"] },
  {
    output: {
      path: path.join(__dirname, "../../dist"),
    },
  },
  {
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".tsx", ".js"],
    },
  },
  parts.page(),
  // parts.loadCSS(),
  parts.extractCSS({ loaders: cssLoaders }),
  parts.loadImages({ limit: 15000 }),
  parts.loadFonts(),
  //
  parts.loadJavaScript(),
  // parts.loadTypeScript(),
]);

// console.log(commonConfig.module.rules);

module.exports = commonConfig;
