const path = require("path");
const glob = require("glob");

const { WebpackPluginServe } = require("webpack-plugin-serve");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin"); // use inside the npm package
const WebpackNotifierPlugin = require("webpack-notifier");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");

exports.page = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
});

exports.devServer = () => ({
  watch: true,
  plugins: [
    new WebpackPluginServe({
      port: process.env.PORT || 8080,
      static: path.join(__dirname, "../../dist"),
      static: "./dist", // Expose if output.path changes
      liveReload: true,
      waitForBuild: true,
    }),
  ],
});

exports.anotherPlugins = () => ({
  plugins: [
    new CaseSensitivePathsPlugin(),
    new WebpackNotifierPlugin({
      title: function (params) {
        return `Build status is ${params.status} with message ${params.message}`;
      },
    }),
  ],
});

exports.loadCSS = () => ({
  module: {
    rules: [{ test: /\.css$/, use: ["style-loader", "css-loader"] }],
  },
});

exports.extractCSS = ({ options = {}, loaders = [] } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.(s[ac]|c)ss$/i, // test: /\.(s?)css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader, options },
            "css-loader",
          ].concat(loaders),
          sideEffects: true,
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
    ],
  };
};

const ALL_FILES = glob.sync(path.join(__dirname, "../../src/*.js"));

exports.eliminateUnusedCSS = () => ({
  plugins: [
    new PurgeCSSPlugin({
      paths: ALL_FILES, // Consider extracting as a parameter
      extractors: [
        {
          extractor: (content) =>
            content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
          extensions: ["html"],
        },
      ],
    }),
  ],
});

exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    postcssOptions: { plugins: [require("autoprefixer")()] },
  },
});

exports.loadImages = ({ limit } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: { dataUrlCondition: { maxSize: limit } },
      },
    ],
  },
});

exports.loadFonts = () => ({
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
});

const APP_SOURCE = path.join(__dirname, "../../src");

exports.loadJavaScript = () => ({
  module: {
    rules: [
      // Consider extracting include as a parameter
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        include: APP_SOURCE,
        use: "babel-loader",
      },
    ],
  },
});

// exports.loadTypeScript = () => ({
//   module: {
//     rules: [
//       // Consider extracting include as a parameter
//       {
//         test: /\.(ts)x?$/,
//         exclude: /node_modules/,
//         include: APP_SOURCE,
//         use: "ts-loader",
//         options: {
//           transpileOnly: true,
//         },
//       },
//     ],
//   },
// });
