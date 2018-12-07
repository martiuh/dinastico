// Only one entry point
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const path = require('path')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')

const webpack = require('webpack')
const { readdirSync } = require('fs')
const webpackMerge = require('webpack-merge')

const routes = require('./.routes/routes.json')

const sharedConfig = require('./webpack.shared')

const paths = Object.keys(routes)

module.exports = function dinasticoWebpack(env) {
  const config = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src', 'build'),
    output: {
      filename: '.dinastico__hidden.js',
      path: path.join(__dirname, 'public'),
      libraryTarget: 'umd',
      globalObject: 'this'
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
      new StaticSiteGeneratorPlugin({
        paths,
        locals: {
          routes
        }
      }),
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
