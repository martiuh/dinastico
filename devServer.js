const express = require('express')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const chalk = require('chalk')
const chokidar = require('chokidar')

const webpackConfig = require('./webpack.config')
const buildDinastico = require('./dinastico.build-chunks')

const clientConfig = webpackConfig(null, { mode: 'development' })
const { publicPath } = clientConfig.output
const outputPath = clientConfig.output.path
const { NODE_ENV } = process.env
const PORT = process.env.PORT || 3030

console.log(chalk.yellow('Building Router'))
buildDinastico() // This is synchronous
console.log(chalk.green('Router Build!!!'))

const Start = () => {
  app.listen(PORT, () => console.log(chalk.magenta(`App lista en ${PORT}`)))
}

const app = express()
const cilentCompiler = webpack(clientConfig)
const devMiddleware = webpackDevMiddleware(cilentCompiler, {
  stats: false,
  publicPath
})

app.use(devMiddleware)
devMiddleware.waitUntilValid(Start)

app.use(hotMiddleware(cilentCompiler, {
  log: false,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}))

app.use(publicPath, express.static(outputPath))
app.use('/*', (req, res) => res.sendFile(path.resolve('./public/index.html')))
