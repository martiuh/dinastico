const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ExtractCSSChunks = require('extract-css-chunks-webpack-plugin')
const { StatsWriterPlugin } = require('webpack-stats-plugin')

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
  optimization: {
    splitChunks: {
        chunks: 'all',
        minSize: 1,
        minChunks: 1,
        name: true,
        automaticNameDelimiter: '-',
        cacheGroups: {
          vendors: {
             test: /[\\/]node_modules[\\/]/,
             priority: -10,
             filename: '[name]-[chunkhash].js'
          }
      }
    },
    minimizer: [
      new TerserPlugin()
    ]
  },
  plugins: [
    new ManifestPlugin({
      fileName: config.manifestFileName,
    }),
    new StatsWriterPlugin()
    // new HtmlPlugin({
    //   inject: true,
    //   template: path.resolve(__dirname, 'template.html')
    // }),
  ]
}
