/* eslint-disable */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 判断当前是否处于开发状态下
const ENV = process.env.NODE_ENV;
const isDev = ENV === 'production' ? false : true;

// 基于Babel的JS/JSX Loader
exports.jsx = {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules)/,
    use: ['babel-loader']
};

// 对于JS与JSX的格式校验
exports.jslint = {
  enforce: 'pre',
  test: /\.(js|jsx)$/,
  exclude: /(node_modules)/,
  use: ['eslint-loader']
};

// 根据不同的环境开发设置不同的样式加载的Loader
const moduleCSSLoader = {
    loader: 'css-loader',
    query: {
        importLoaders: 1
    }
};

const postCSSLoader = {
    loader: 'postcss-loader',
    options: {
        config: {
            path: path.join(__dirname, './postcss.config.js')
        }
    }
};

exports.styles = {
  css: {
    test: /\.css$/,
    use: isDev
        ? ['style-loader', 'css-loader', postCSSLoader]
        : ExtractTextPlugin.extract({
                use: ['css-loader', postCSSLoader]
            })
  },
  less: {
    test: /\.(less)$/,
    use: isDev
        ? ['style-loader', 'css-loader', postCSSLoader, 'less-loader']
        : ExtractTextPlugin.extract({
                use: ['css-loader', postCSSLoader, 'less-loader']
            })
  }
};

// 对于图片与字体文件的导入工具,并且设置默认的dist中存放方式
// inline base64 URLs for <=8k images, direct URLs for the rest
exports.assets = {
    test: /\.(eot|woff|woff2|ttf)(\?\S*)?$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 8192,
            name: isDev ? 'font/[name].[ext]' : 'font/[name].[hash:8].[ext]'
        }
    }]
};

exports.images = {
    test: /\.(svg|png|jpe?g|gif|webm)(\?\S*)?$/,
    use: [{
        loader: 'file-loader',
        options: {
            limit: 8192,
            name: isDev ? 'images/[name].[ext]' : 'images/[name].[hash:8].[ext]'
        }
    }]
};
