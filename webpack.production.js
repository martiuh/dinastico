// const path = require('path')
// const fs = require('fs')
// const TerserPlugin = require('terser-webpack-plugin')
// const webpack = require('webpack')
// const ManifestPlugin = require('webpack-manifest-plugin')
// const HtmlPlugin = require('html-webpack-plugin')
//
// // const { readdirSync } = fs
// // const pagesPath = path.resolve(__dirname, 'src', 'pages')
// // const pages = readdirSync(pagesPath)
// // const routes = {}
// // const paths = pages.map(P => {
// //   const routeName = `/${P.split('.js')[0]}/`
// //   const indexName = P !== 'index.js' ? routeName : '/'
// //   routes[indexName] = P
// //   return indexName
// // })
// //
// // const buildRoutes = require('./engine/build-routes')
// //
// // fs.writeFile(path.join(__dirname, 'components.js'), buildRoutes() , err => {
// //   if (err) {
// //     return console.error('Error', err)
// //   }
// // })
//
// module.exports = {
//   entry: {
//     bundle: path.resolve(__dirname, 'src')
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     publicPath: '/',
//     filename: '[name]-[chunkhash:10].js'
//   },
//   mode: 'production',
//   cache: {},
//   devtool: 'source-maps',
//   optimization: {
//     // splitChunks: {
//     //   cacheGroups: {
//     //     vendor: {
//     //       test: /[\\/]node_modules[\\/]/,
//     //       name: 'vendor',
//     //       chunks: 'all'
//     //     }
//     //   }
//     // },
//     // runtimeChunk: 'single',
//     minimizer: [new TerserPlugin({
//       sourceMap: true,
//       terserOptions: {
//         mangle: {
//           properties: /(^_|_$)/
//         },
//         safari10: true
//       }
//     })]
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader'
//       }
//     ]
//   },
//   plugins: [
//     new HtmlPlugin({
//       template: path.resolve(__dirname, 'template.html'),
//       inject: true
//     }),
//     // new webpack.NamedChunksPlugin(chunk => {
//     //   const hashChunk = () => (
//     //     md5(Array.from(chunk.modulesIterable, m => m.identifier().join().slice(0, 10)))
//     //   )
//     //   return chunk.name ? chunk.name : hashChunk()
//     // })
//   ]
// }

const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const config = require('./engine/config')
const { addAsset, getManifest } = require('./engine/assets')

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: path.join(__dirname, 'src')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name]-[chunkhash:10].js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new ManifestPlugin({
      fileName: config.manifestFileName,
    }),
    // new HtmlPlugin({
    //   inject: true,
    //   template: path.resolve(__dirname, 'template.html')
    // }),
  ]
}
