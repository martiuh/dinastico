// Only one entry point
const path = require('path')
const DisableOutput = require('disable-output-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const sharedConfig = require('./webpack.shared')

module.exports = function estaticoWebpack(env) {
  const config = {
    target: 'node',
    mode: 'production',
    entry: path.resolve(__dirname, 'estatico.router.js'),
    output: {
      filename: 'buildRoutes.js',
      path: path.join(__dirname, '.routes'),
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'css-loader/locals',
              options: {
                modules: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      // new DisableOutput(),
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

  let shared = sharedConfig(env)
  shared.module.rules = shared.module.rules.filter(({ test }) => String(test) !== String(/\.css$/) )
  return webpackMerge.smart(shared, config)
}
