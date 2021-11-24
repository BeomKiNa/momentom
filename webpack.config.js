const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv").config();

module.exports = {
  name: "momentom-setting",
  mode: "development",
  devtool: "eval",
  resolve: {
    extensions: [".js"],
  },
  entry: {
    app: "./src/js/index",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },

  output: {
    filename: "app.js",
    path: path.join(__dirname, "dist"),
  },

  plugins: [new webpack.EnvironmentPlugin(Object.keys(dotenv.parsed || {}))],
};
