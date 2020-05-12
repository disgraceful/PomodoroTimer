const path = require("path");

module.exports = {
  mode: "production",
  entry: "./js/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "prod.js",
    publicPath: "./assets/",
  },
};
