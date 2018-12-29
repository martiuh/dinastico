module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        exclude: /node_modules/,
        use: [
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}
