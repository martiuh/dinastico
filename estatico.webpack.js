// Only one entry point
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const path = require('path')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const DisableOutput = require('disable-output-webpack-plugin')

const { readdirSync } = require('fs')

const pagesPath = path.resolve(__dirname, 'src', 'pages')
const pages = readdirSync(pagesPath)
const routes = {}
const paths = pages.map(P => {
  const routeName = `/${P.split('.js')[0]}/`
  const indexName = P !== 'index.js' ? routeName : '/'
  routes[indexName] = P
  return indexName
})

module.exports = {
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
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new StaticSiteGeneratorPlugin({
      paths,
      locals: {
        routes
      }
    })
  ]
}
