'use strict'
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import webpack from 'webpack';

import webpackPath from './path';

const baseConfig = {
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
    path: webpackPath.distPath,
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
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
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
};

export default baseConfig;