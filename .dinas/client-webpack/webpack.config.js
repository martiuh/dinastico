// Only one entry point
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractCSSChunks = require('extract-css-chunks-webpack-plugin')

const sharedConfig = require('./webpack.shared')
const devConfig = require('./webpack.dev')
const wpProduction = require('./webpack.production')


const baseConfig = (env, argv, envConfig) => {
  const isDev = argv.mode === 'development'
  const shared = sharedConfig(env)
  const config = {
    target: 'web',
    context: path.join(__dirname, '../../'),
    module: {
      rules: [
        {
          test: /\.(css|scss|sass)$/,
          use: [
            ExtractCSSChunks.loader,
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new ExtractCSSChunks({
        filename: `[name]${isDev ? '' : '.[chunkhash]'}.css`,
        hot: isDev,
        cssModules: false
      }),
      new webpack.DefinePlugin({
        IS_SERVER: false,
        'process.env': {
          NODE_ENV: JSON.stringify(argv.mode || 'development')
        }
      })
    ]
  }

  return webpackMerge.smart(envConfig, config, shared)
}

module.exports = function webpackConfig(env, argv) {
  const dev = devConfig
  const production = wpProduction(env, argv)
  let config = null
  if (argv.mode === 'production') {
    config = baseConfig(env, argv, production)
  }
  else {
    config = baseConfig(env, argv, dev)
  }
  return config
}
