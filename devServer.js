const express = require('express')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const chokidar = require('chokidar')
const fs = require('fs')
const report = require('./report')

const webpackConfig = require('./webpack.config')
const buildDinastico = require('./dinastico.build-chunks')
// check if pagesDir exists in src
const pagesDir = path.resolve(__dirname, 'src', 'pages')
const hasPages = fs.existsSync(pagesDir)
if (!hasPages) {
  report.failure('make sure ./src/pages folder exists')
}

const clientConfig = webpackConfig(null, { mode: 'development' })
const { publicPath } = clientConfig.output
const outputPath = clientConfig.output.path
const PORT = process.env.PORT || 3030

report.event('building router')
buildDinastico() // This is synchronous
report.success('router build!!!')

const Start = () => {
  const watcher = chokidar.watch(pagesDir)
  // watcher
  //   .on('add', file => report.event(`${file} was added`))
  //   .on('unlink', file => report.warn(`${file} was removed`))

  app.listen(PORT, () => report.success(`app is running in localhost:${PORT}`))
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
