const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = (env, argv) => {
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
        new TerserPlugin({
          parallel: true,
          cache: true,
          sourceMap: false,
          terserOptions: {
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2
            },
            mangle: {
              safari10: true
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            }
          }
        })
      ]
    },
    plugins: [
      new StatsWriterPlugin()
    ]
  }
  if (env === 'ANALYZE') {
    clientProduction.plugins.push(new BundleAnalyzerPlugin())
  }

  return clientProduction
}
