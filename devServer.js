const express = require('express')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const hotServerMiddleware = require('webpack-hot-server-middleware')
const chalk = require('chalk')

const webpackConfig = require('./webpack.config')

const clientConfig = webpackConfig()
const { publicPath } = clientConfig.output
const outputPath = clientConfig.output.path
const { NODE_ENV } = process.env
const isDev = NODE_ENV !== 'production'
let PORT = isDev ? 3030 : 8080
PORT = process.env.PORT || PORT

const Start = () => {
  app.listen(PORT, () => console.log(chalk.magenta(`App lista en ${PORT}`)))
}
const app = express()
const devCompiler = webpack(clientConfig)
const devMiddleware = webpackDevMiddleware(devCompiler, {
  stats: {
    colors: true
  },
  publicPath
})

devMiddleware.waitUntilValid(Start)
const cilentCompiler = devCompiler

app.use(hotMiddleware(cilentCompiler, {
  log: false,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}))
app.use(devMiddleware)
app.use(publicPath, express.static(outputPath))
app.use('/*', (req, res) => res.sendFile(path.resolve('./public/index.html')))
