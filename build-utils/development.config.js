const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/pug/index.pug"
    }),
    new HtmlWebpackPlugin({
      filename: "swiper.html",
      template: "./src/pug/swiper.pug"
    })
  ],
  devServer: {
    stats: "errors-only"
  }
};
