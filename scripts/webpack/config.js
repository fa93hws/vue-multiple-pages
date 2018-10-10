'use strict'
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack');

const routes = require('./routes');

module.exports = {
  resolve: {
    extensions: ['.vue', '.js', '.json']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  output: {
    path: routes.frontDist,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  watchOptions: {
    ignored: /node_modules/,
    poll: true
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}