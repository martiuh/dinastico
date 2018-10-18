const path = require('path')
const fs = require('fs')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const md5 = require('md5')

const config = require('./engine/config')
const { addAsset, getManifest } = require('./engine/assets')

const { readdirSync } = fs
const pagesPath = path.resolve(__dirname, 'src', 'pages')
const pages = readdirSync(pagesPath)
const routes = {}
const paths = pages.map(P => {
  const routeName = `/${P.split('.js')[0]}/`
  const indexName = P !== 'index.js' ? routeName : '/'
  routes[indexName] = P
  return indexName
})

const buildRoutes = require('./engine/build-routes')

fs.writeFile(path.join(__dirname, 'components.js'), buildRoutes() , err => {
  if (err) {
    return console.error('Error', err)
  }
})

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name]-[chunkhash:10].js'
  },
  entry: {
    bundle: path.resolve(__dirname, 'src')
  },
  mode: 'production',
  cache: {},
  devtool: 'source-maps',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-universal-component|@reach\/router)[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: 'single',
    minimizer: [new TerserPlugin({
      sourceMap: true,
      terserOptions: {
        mangle: {
          properties: /(^_|_$)/
        },
        safari10: true
      }
    })]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    // new webpack.NamedChunksPlugin(chunk => {
    //   const hashChunk = () => (
    //     md5(Array.from(chunk.modulesIterable, m => m.identifier().join().slice(0, 10)))
    //   )
    //   return chunk.name ? chunk.name : hashChunk()
    // }),
    new ManifestPlugin({
      seed: getManifest(),
      fileName: config.manifestFileName,
      generate: (seed, files) => (
        files.reduce((manifest, opts) => {
          // Needed until this issue is resolved:
          // https://github.com/danethurber/webpack-manifest-plugin/issues/159
          const unhashedName = path.basename(opts.path)
            .replace(/[_\.\-][0-9a-f]{10}/, '') // eslint-disable-line no-useless-escape
          addAsset(unhashedName, opts.path)
          return getManifest()
        }, seed)
      )
    })
  ]
}
