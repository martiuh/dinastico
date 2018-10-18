const path = require('path')

module.exports = {
  entry: {
    bundle: path.join(__dirname, 'src')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 3000,
    open: true,
    historyApiFallback: true
  }
}
