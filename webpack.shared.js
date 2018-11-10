const ExtractCSSChunks = require('extract-css-chunks-webpack-plugin')

module.exports = function webpackShared(env) {
  const config = {
    module: {
      rules: [
        {
          test: /\.js$/,
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
      extensions: ['.js', '.css']
    }
  }
  return config
}
