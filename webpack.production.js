const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const clientProduction = {
  devtool: 'source-map',
  entry: {
    bundle: path.join(__dirname, 'src', 'production-renderer')
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: '[name]-[chunkhash].js'
  },
  mode: 'production',
  optimization: {
    splitChunks: {
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
    new StatsWriterPlugin()
    // new HtmlPlugin({
    //   inject: true,
    //   template: path.resolve(__dirname, 'template.html')
    // }),
  ]
}
if (process.env.ANAYLYZE) {
  clientProduction.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = clientProduction
