const path = require('path')
const WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
  entry: {
    bundle: path.join(__dirname, 'src')
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
    new WriteFilePlugin()
  ]
}
