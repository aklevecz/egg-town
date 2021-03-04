const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const dotenv = require("dotenv");
module.exports = (env) => {
  console.log(env);
  return {
    entry: { main: "./src/indexSilver.js" },
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
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "SILVER.RAPTORS",
        favicon: "./raptor.png",
        template: "./index.html",
        filename: "../../functions/silver-index.html",
        publicPath: "/silver",
        inject: "body",
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
    output: {
      filename: "[contenthash].silver-raptor.js",
      path: path.join(__dirname, "public/silver"),
    },
  };
};
