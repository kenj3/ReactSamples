const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const proxy = require('http-proxy-middleware');
const webpackConfig = require('./webpack.dev');
const webpackServerConfig = {
    host: '0.0.0.0',
    port: 1234
};

const compiler = webpack(webpackConfig);

const config = {
    contentBase: path.join(__dirname, '../src'),
    publicPath: '/',
    hot: true,
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    stats: {
        errors: true,
        color: true,
        chunks: false,
        modules: false
    },
    before(app) {
        // app.use(errorOverlayMiddleware());
        // 本地开发跨域配置
        app.use('/api/*', proxy(
            '/api', {
                target: 'http://www.test.net',
                secure: false,
                changeOrigin: true,
            }
        ));
    }
};

const server = new WebpackDevServer(compiler, config);

server.listen(webpackServerConfig.port, webpackServerConfig.host, function (err, result) {
    if (err) {
        return console.log(err);
    }
    console.log(`Listening at http://${webpackServerConfig.host}:${webpackServerConfig.port}/`);
});
