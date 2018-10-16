const webpack = require('webpack')
const { readdirSync } = require('fs')
const path = require('path')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')

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
  plugins: [
    new StaticSiteGeneratorPlugin({
      paths,
      locals: {
        routes
      }
    })
  ]
}
