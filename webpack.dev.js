const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

/** @type {import("webpack").Configuration}  */

const devConfig = {
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}

module.exports = merge(common, devConfig);