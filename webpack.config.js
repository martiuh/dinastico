// Only one entry point
const path = require('path')
const webpackMerge = require('webpack-merge')
const { StatsWriterPlugin } = require('webpack-stats-plugin')

const dev = require('./webpack.dev')
const production = require('./webpack.production')

const { NODE_ENV } = process.env

const baseConfig = (env, envConfig) => {
  const estaticoFilename = NODE_ENV === 'production' ? 'builder' : 'dev'
  const config = {
    mode: NODE_ENV || 'development',
    devtool: 'source-maps',
    entry: {
      bundle: path.resolve(__dirname, 'src', estaticoFilename),
      vendor: ['react', 'react-dom', '@reach/router']
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'dist'),
      chunkFilename: '[name].[chunkhash].bundle.js',
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
      new StatsWriterPlugin()
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
