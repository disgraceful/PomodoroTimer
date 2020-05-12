const path = require("path");

module.exports = {
  mode: "development",
  entry: "./js/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "./assets/",
  },
  devtool: "cheap-module-source-map",
  devServer: {
    port: 9000,
  },
};
