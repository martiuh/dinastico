// Only one entry point
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const path = require('path')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const DisableOutput = require('disable-output-webpack-plugin')
const webpack = require('webpack')
const { readdirSync } = require('fs')
const webpackMerge = require('webpack-merge')

const sharedConfig = require('./webpack.shared')

const pagesPath = path.resolve(__dirname, 'src', 'pages')
const pages = readdirSync(pagesPath)
const routes = {}
const paths = pages.map(P => {
  const routeName = `/${P.split('.js')[0]}`
  const indexName = P !== 'index.js' ? routeName : '/'
  routes[indexName] = P
  return indexName
})

module.exports = function estaticoWebpack(env) {
  const config = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src', 'build'),
    output: {
      filename: '.estatico__hidden.js',
      path: path.join(__dirname, 'dist'),
      libraryTarget: 'umd',
      globalObject: 'this'
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
      new StaticSiteGeneratorPlugin({
        paths,
        locals: {
          routes
        }
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  }

  let shared = sharedConfig(env)
  shared.module.rules = shared.module.rules.filter(({ test }) => String(test) !== String(/\.css$/) )
  return webpackMerge.smart(shared, config)
}
