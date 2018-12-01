const path = require('path')
const WriteFilePlugin = require('write-file-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    bundle: [
      'webpack-hot-middleware/client?__webpack_hmr&reload=true&overlay=true',
      path.join(__dirname, 'src', 'development-renderer')
    ]
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 3000,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './dev-template.html'
    }),
    new WriteFilePlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
