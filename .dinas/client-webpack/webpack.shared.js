const path = require('path')
const webpack = require('webpack')

module.exports = function webpackShared(env, argv) {
  const config = {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader'
        }
      ]
      // No .css here
    },
    resolve: {
      extensions: ['.js', '.css', '.scss', '.sass', '.jsx'],
      alias: {
        'react-dom': '@hot-loader/react-dom',
        'dinastico-link': path.resolve(__dirname, '../dinastico-link'),
        unoapi: path.resolve(__dirname, '../../src/unoapi.js')
      }
    }
  }
  return config
}
