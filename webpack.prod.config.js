const path = require("path");

module.exports = {
  mode: "production",
  entry: "./js/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "./assets/",
  },
};
