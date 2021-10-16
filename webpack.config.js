const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    modules: [
      path.resolve(__dirname, ''),
      path.resolve(__dirname, 'node_modules')
    ]
  },
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    })
  ]
};

module.exports = config;