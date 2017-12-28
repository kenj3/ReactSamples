const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

process.noDeprecation = true
  // 入口
var entry = {
  // 把有需要打包的常用库封装，如babel-polyfill,jquery等
  vendor: ['babel-polyfill', 'vue/dist/vue.runtime.min', 'jquery/dist/jquery.slim.min']
}

var config = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, '../dist/static/js'),
    filename: '[name].js',
    library: '[name]_library'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '..')
    }),
    // 划重点！！
    new webpack.DllPlugin({
    // 指定路径
      path: path.join(__dirname, '../dist', '[name]-manifest.json'),
    // 指定依赖库的名称
      name: '[name]_library'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      output: false,
      compress: {
        unused: true,
        dead_code: true,
        pure_getters: true,
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        comparisons: true,
        sequences: true,
        evaluate: true,
        join_vars: true,
        if_return: true
      },
      comments: false,
      minimize: true
    })
  ]
}

module.exports = config;
