const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const loaders = require('./loader');

// 配置常量
// 源代码的根目录（本地物理文件路径）
const ENV = process.env.NODE_ENV;
const isDev = ENV === 'production' ? false : true;

const SRC_PATH = path.resolve(__dirname, '../src');
const APP_PATH = path.resolve(__dirname, '../src/app');
// 打包后的资源根目录（本地物理文件路径）
const ASSET_BUILD_PATH = path.resolve(__dirname, '../dist');
// 资源根目录（可以是 CDN 上的绝对路径，或相对路径）
const ASSET_PUBLIC_PATH = 'asset/';
// 多项目入口
const pageEntry = [
    {
        name:'admin',
        title: '后台管理系统'
    }
];

const baseConfig = {
    context: SRC_PATH, // 设置源代码的默认根路径
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            Common: path.resolve(__dirname, '../src/app/common/'),
            Vendor: path.resolve(__dirname, '../src/vendor/'),
            Data: path.resolve(__dirname, '../src/data/'),
        }
    },
    entry: {
        // lib库入口
        vendor: [
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'redux',
            'redux-thunk',
            'antd',
            'lodash',
            'moment'
        ]
    },
    output: {
        path: ASSET_BUILD_PATH,
        publicPath: './',
        filename: isDev ? '[name].js' : 'asset/[name].[hash:8].js',
        chunkFilename: 'asset/[name].chunk.js'
    },
    module: {
        rules: [
            loaders.jslint,
            loaders.jsx,
            loaders.styles.css,
            loaders.styles.less,
            loaders.images,
            loaders.assets
        ]
    },
    plugins: [
        // 每次打包前，先清空原来目录中的内容
        new CleanWebpackPlugin([ASSET_BUILD_PATH], {
            verbose: true,
            allowExternal: true
        }),
        // 分离lib库
        new webpack.optimize.CommonsChunkPlugin( {
            names: 'vendor',
            minChunks: Infinity
        }),
        // 分离common库
        new webpack.optimize.CommonsChunkPlugin( {
            names: 'common',
            minChunks: Infinity
        })
    ]
    
};

const pageEntryList = {};

pageEntry.forEach(function(entry){
    pageEntryList[entry.name] = [path.resolve(APP_PATH, `${entry.name}/index.js`)];

    const plug = new HtmlWebpackPlugin({
        name: entry.name,
        filename: `${entry.name}.html`,
        title: entry.title,
        chunks: ['common', 'vendor', entry.name],
        chunksSortMode: 'manual',
        template: path.resolve(__dirname, './index.ejs'),
        inject: true
    });

    baseConfig.plugins.push(plug);
});

baseConfig.entry = Object.assign({}, baseConfig.entry, pageEntryList);


module.exports = baseConfig;