const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const dotenv = require("dotenv").config();
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  name: "momentom-setting",
  mode: "development",
  devtool: "inline-cheap-module-source-map",
  resolve: {
    extensions: [".js", ".ts"],
  },
  entry: {
    app: "./src/ts/index",
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
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
    new ForkTsCheckerWebpackPlugin(),
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
