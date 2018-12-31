/*
  Change things such as webpackConfig
  (be mindful not to override dinastico's webpack configuration)
*/
const path = require('path')

exports.webpackConfig = (env, argv) => ({
  resolve: {
    alias: {
      unoapi: path.resolve(__dirname, './src/unoapi.js')
    }
  }
})
