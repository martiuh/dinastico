const path = require('path')

module.exports = function webpackShared(env) {
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
        'dinastico-link': path.resolve(__dirname, 'src/dinastico-link'),
        unoapi: path.resolve(__dirname, 'src/unoapi.js')
      }
    }
  }
  return config
}
