/**
 * Created by kee on 15/9/22.
 */
'use strict';

var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    devtool: 'source-map',
    target: 'web',
    context: path.resolve(__dirname, '..'),
    entry: {
        app:[
            './app/src/app',
        ]
    },
    output: {
        path: path.join(__dirname, '..', '/app/dist'),
        filename: 'js/[hash].js',
        publicPath: '/dist/',
        chunkFilename: '[hash].bundle.js'
    },
    plugins: [
        new ExtractTextPlugin('css/[hash].css', { allChunks: true }),
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
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss') }
        ]
    }
};