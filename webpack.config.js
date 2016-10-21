require("babel-register");

const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const { isDevelopment, getValue } = require("./config/config");

const NODE_ENV = process.env.NODE_ENV || "development";

const defaultBabelPlugins = [
  "transform-flow-strip-types",
  "transform-async-to-generator"
];

const webpackConfig = {
  entry: {
    bundle: ["./public/js/main.js"]
  },
  output: {
    path: path.join(__dirname, "public/build"),
    filename: "[name].js",
    publicPath: "/build"
  },
  devtool: "source-map",
  module: {
    loaders: [
        { test: /\.json$/,
          loader: "json" },
        { test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loaders: [
            "babel?" +
            defaultBabelPlugins.map(p => "plugins[]=" + p)
          ],
          isJavaScriptLoader: true },
      { test: /\.svg$/,
        loader: "svg-inline" },
      { test: /\.css$/,
        loader: "style!css" }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(NODE_ENV),
        TARGET: JSON.stringify("local")
      }
    })
  ]
}
if (getValue("hotReloading")) {
  webpackConfig.entry.bundle.push("webpack-hot-middleware/client");

  webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]);
}

module.exports = webpackConfig;