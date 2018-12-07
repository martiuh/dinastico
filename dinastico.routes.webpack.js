// Only one entry point
const path = require('path')
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')
const webpackMerge = require('webpack-merge')
const sharedConfig = require('./webpack.shared')

module.exports = function dinasticoWebpack(env) {
  const config = {
    target: 'node',
    mode: 'production',
    entry: path.resolve(__dirname, 'dinastico.routes.js'),
    output: {
      filename: 'buildRoutes.js',
      path: path.join(__dirname, '.routes')
    },
    module: {
      rules: [
        {
          test: /\.(css|scss|sass)$/,
          exclude: /node_modules/,
          use: [
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new WriteFilePlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
      new webpack.DefinePlugin({
        IS_SERVER: true,
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
        }
      })
    ]
  }

  const shared = sharedConfig(env)
  shared.module.rules = shared.module.rules.filter(({ test }) => String(test) !== String(/\.css$/))
  return webpackMerge.smart(shared, config)
}
