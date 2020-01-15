const paths = require('./paths')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  entry: {
    library: paths.src + "/index"
  },
  output: {
    libraryTarget: 'umd',
    library: 'daoed',
    // Workaround to fix umd build, restore webpack v3 behaviour
    // https://github.com/webpack/webpack/issues/6677
    // https://github.com/webpack/webpack/issues/6642
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    path: paths.build,
    filename: "index.js",
    publicPath: '/',
  },
  plugins: [
  ],
  module: {
  },

  /**
   * Optimization
   *
   * Production minimizing of JavaSvript and CSS assets.
   */
  optimization: {
    minimizer: [new TerserJSPlugin({})],
  },
  performance: {
  },
})
