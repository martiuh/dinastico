// Only one entry point
const path = require('path')
const webpackMerge = require('webpack-merge')

const dev = require('./webpack.dev')
const production = require('./webpack.production')

const { NODE_ENV } = process.env

const baseConfig = (env, config) => {
  const estaticoFilename = NODE_ENV === 'production' ? 'builder' : 'dev'
  const conf = {
    mode: NODE_ENV || 'development',
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
    }
  }

  return webpackMerge(conf, config)
}

module.exports = (env, argv) => {
  let config = baseConfig(env, dev)
  if (NODE_ENV === 'production') {
    config = baseConfig(env, production)
  }
  return config
}
