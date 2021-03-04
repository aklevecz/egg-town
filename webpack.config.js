const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const dotenv = require("dotenv");

module.exports = (env) => {
  return {
    entry: { main: "./src/index.js" },
    mode: env.NODE_ENV,
    module: {
      rules: [
        { test: /\.(js|jsx)$/, use: ["babel-loader"], exclude: /node_modules/ },
        { test: /\.css$/i, use: ["style-loader", "css-loader"] },
        { test: /\.(otf)$/i, type: "asset/resource" },
        { test: /\.glb$/i, use: ["file-loader"] },
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          "**/*",
          "!silver/**",
          "!CNAME",
          "!404.html",
          "!silver_raptor2.glb",
        ],
      }),
      new HtmlWebpackPlugin({
        title: "SILVER.RAPTORS",
        favicon: "./raptor.png",
        template: "./index.html",
        // filename: "../functions/index.html",
        publicPath: "/",
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(
          dotenv.config({
            path: env.development
              ? path.join(__dirname + "/.env.dev")
              : path.join(__dirname + "/.env"),
          }).parsed
        ),
      }),
    ],
    resolve: {
      extensions: ["*", ".js", ".jsx"],
    },
    devtool: "inline-source-map",
    devServer: {
      contentBase: "./public",
      port: 9000,
    },
    output: {
      filename: "[contenthash].bundle.js",
      path: path.join(__dirname, "/public"),
    },
  };
};
