const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: [
      path.resolve(__dirname, "./app/js/app.js"),
      path.resolve(__dirname, "./app/scss/app.scss")
    ]
  },
  output: {
    path: path.resolve(__dirname, "./docs"),
    filename: "./app.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "./app/js")
        ],
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, "./app/scss")
        ],
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./app.css"
    })
  ]
};
