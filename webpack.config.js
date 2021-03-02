const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: { main: "./src/index.js" },
  mode: "development",
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
      cleanOnceBeforeBuildPatterns: ["!CNAME"],
    }),
    new HtmlWebpackPlugin({
      title: "SILVER.RAPTORS",
      favicon: "./raptor.png",
      template: "./index.html",
      filename: "../functions/index.html",
      publicPath: "/",
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
    path: path.join(__dirname, "/dist"),
  },
};
