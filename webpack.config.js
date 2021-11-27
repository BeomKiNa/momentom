const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const dotenv = require("dotenv").config();
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

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
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },

  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin(Object.keys(dotenv.parsed || {})),
    new MiniCssExtractPlugin({ filename: "css/styles.css" }),
    new HtmlWebpackPlugin({
      template: path.join(fs.realpathSync(process.cwd()), "public/index.html"),
    }),
    new CopyPlugin({
      patterns: [{ from: "./src/assets/images", to: "./assets/images" }],
    }),
  ],

  output: {
    filename: "js/app.js",
    path: path.join(__dirname, "dist"),
    clean: true,
  },

  devServer: {
    open: true,
    compress: true,
    hot: true,
  },
};
