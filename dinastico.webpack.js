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
let routes = {}
const paths = pages.map(P => {
  const routeName = `/${P.split('.js')[0]}`
  const indexName = P !== 'index.js' ? routeName : '/'
  routes[indexName] = P
  return indexName
})

routes = {
  ...routes,
  '/msg/message': 'msg.js'
}

paths.push('/msg/message')
// paths.push('/world/worlded')

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
