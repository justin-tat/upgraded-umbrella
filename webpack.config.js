const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, "client", "App.jsx"),
  output: {
    path:path.resolve(__dirname, "client/dist"),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.?jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "client", "index.html"),
    }),
  ],
}