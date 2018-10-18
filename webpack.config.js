// Only one entry point
const path = require('path')
const webpackMerge = require('webpack-merge')

const dev = require('./webpack.dev')
const production = require('./webpack.production')

const { NODE_ENV } = process.env

const isDev = NODE_ENV === 'development'

const baseConfig = (env, envConfig) => {
  const estaticoFilename = isDev ? 'dev' : 'build'
  const config = {}
  return webpackMerge(envConfig, config)
}

module.exports = (env, argv) => {
  let config = baseConfig(env, dev)
  if (NODE_ENV === 'production') {
    config = baseConfig(env, production)
  }
  return config
}
