const ExtractCSSChunks = require('extract-css-chunks-webpack-plugin')
const path = require('path')

module.exports = function webpackShared(env) {
  const config = {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            ExtractCSSChunks.loader,
            'css-loader'
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.css', '.jsx'],
      alias: {
        'dinastico-link': path.resolve(__dirname, 'src/Link')
      }
    }
  }
  return config
}
