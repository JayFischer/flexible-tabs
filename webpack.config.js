const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    background: "./src/background"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: "*",
        context: "src",
        ignore: ["*.js"]
      },
      {
        from: "*",
        context: "src/icons",
        to: "icons"
      }
    ])
  ],
  devtool: "source-map"
};
