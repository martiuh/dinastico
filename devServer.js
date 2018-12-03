const express = require('express')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const chalk = require('chalk')
const chokidar = require('chokidar')

const webpackConfig = require('./webpack.config')
const buildDinastico = require('./dinastico.build-chunks')

const clientConfig = webpackConfig()
const { publicPath } = clientConfig.output
const outputPath = clientConfig.output.path
const { NODE_ENV } = process.env
const isDev = NODE_ENV !== 'production'
let PORT = isDev ? 3030 : 8080
PORT = process.env.PORT || PORT

console.log(chalk.yellow('Building Router'))
buildDinastico() // This is synchronous
console.log(chalk.green('Router Build!!!'))
const Start = () => {
  app.listen(PORT, () => console.log(chalk.magenta(`App lista en ${PORT}`)))
}

const app = express()
const devCompiler = webpack(clientConfig)
const devMiddleware = webpackDevMiddleware(devCompiler, {
  stats: false,
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
