const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
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
      },
      {
        from: "node_modules/webextension-polyfill/dist/browser-polyfill.min.js"
      }
    ])
  ],
  devtool: "source-map"
};
