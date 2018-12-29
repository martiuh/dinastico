const path = require('path')
const WriteFilePlugin = require('write-file-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    bundle: [
      'webpack-hot-middleware/client?__webpack_hmr&reload=true&overlay=true',
      path.join(__dirname, '../dev-renderer/dev-renderer')
    ]
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../../public/'),
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './dev-template.html')
    }),
    new WriteFilePlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
