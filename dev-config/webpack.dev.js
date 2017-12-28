const webpack = require('webpack');
// 读取同一目录下的 base config
const config = require('./webpack.base.js');

// 添加 Sourcemap 支持
config.plugins.push(
    new webpack.SourceMapDevToolPlugin( {
        filename: '[file].map',
        exclude: ['vendor']
    })
    // new webpack.HotModuleReplacementPlugin()
);

module.exports = config;