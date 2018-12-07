// Only one entry point
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractCSSChunks = require('extract-css-chunks-webpack-plugin')

const sharedConfig = require('./webpack.shared')
const dev = require('./webpack.dev')
const production = require('./webpack.production')

const { NODE_ENV } = process.env

const isDev = NODE_ENV === 'development'

const baseConfig = (env, argv, envConfig) => {
  const shared = sharedConfig(env)
  const config = {
    target: 'web',
    module: {
      rules: [
        {
          test: /\.(css|scss|sass)$/,
          use: [
            ExtractCSSChunks.loader,
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new ExtractCSSChunks({
        filename: `[name]${isDev ? '' : '.[chunkhash]'}.css`,
        hot: isDev,
        cssModules: false
      }),
      new webpack.DefinePlugin({
        IS_SERVER: false,
        'process.env': {
          NODE_ENV: JSON.stringify(NODE_ENV || 'development')
        }
      })
    ]
  }

  return webpackMerge.smart(envConfig, config, shared)
}

module.exports = function webpackConfig(env, argv) {
  let config = baseConfig(env, argv, dev)
  if (NODE_ENV === 'production') {
    config = baseConfig(env, argv, production)
  }
  return config
}
