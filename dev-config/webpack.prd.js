const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 读取同一目录下的 base config
const config = require('./webpack.base.js');

config.plugins.push(
    // 官方文档推荐使用下面的插件确保 NODE_ENV
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    // 抽取 CSS 文件
    new ExtractTextPlugin({
        filename: 'asset/[name].[hash:8].css',
        allChunks: true,
        ignoreOrder: true
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.UglifyJsPlugin()
);

module.exports = config;
