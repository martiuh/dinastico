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

const baseConfig = (env, envConfig) => {
  const estaticoFilename = isDev ? 'dev' : 'build'
  const shared = sharedConfig(env)
  const config = {
    ...shared,
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

  return webpackMerge(envConfig, config)
}

module.exports = function webpackConfig(env, argv) {
  let config = baseConfig(env, dev)
  if (NODE_ENV === 'production') {
    config = baseConfig(env, production)
  }
  return config
}
