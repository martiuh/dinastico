// Only one entry point
const path = require('path')
const webpackMerge = require('webpack-merge')
const { StatsWriterPlugin } = require('webpack-stats-plugin')

const dev = require('./webpack.dev')
const production = require('./webpack.production')

const { NODE_ENV } = process.env

const isDev = NODE_ENV === 'development'
const baseConfig = (env, envConfig) => {
  const estaticoFilename = isDev ? 'dev' : 'build'
  const config = {
    mode: NODE_ENV || 'development',
    devtool: 'source-maps',
    entry: path.resolve(__dirname, 'src', estaticoFilename),
    output: {
      filename: 'trash.js',
      path: path.join(__dirname, 'dist'),
      libraryTarget: 'umd',
      globalObject: 'this'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      // new StatsWriterPlugin()
    ]
  }

  return webpackMerge(envConfig, config)
}

module.exports = (env, argv) => {
  let config = baseConfig(env, dev)
  if (NODE_ENV === 'production') {
    config = baseConfig(env, production)
  }
  return config
}
