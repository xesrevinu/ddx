/**
 * Created by kee on 15/9/22.
 */
'use strict';

var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    target: 'web',
    context: path.resolve(__dirname, '..'),
    entry: {
        app:[
            'webpack-dev-server/client?http://0.0.0.0:4000',
            'webpack/hot/only-dev-server',
            './app/src/app',
        ]
    },
    output: {
        path: path.join(__dirname, '..', '/app/dev'),
        filename: 'js/bundle.js',
        publicPath: '',
        chunkFilename: '[id].bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new htmlWebpackPlugin({
            title: 'Redux React Router Async Example',
            filename: 'index.html',
            template: './app/src/index.template.html',
            //favicon: path.join(__dirname, 'assets', 'images', 'favicon.ico')
        })
    ],
    postcss: [
        require('autoprefixer-core'),
        require('postcss-color-rebeccapurple')
    ],
    resolve: {
        modulesDirectories: [
            'src',
            'bower_components',
            'node_modules',
        ],
        extensions: ['', '.json', '.js']
    },
    module: {
        loaders: [
            {test: /\.js$/,loaders: ['babel?stage=0&experimental'], exclude: /node_modules/},
            {test: /\.css$/, loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'}
        ]
    }
};