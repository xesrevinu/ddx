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
		app: [
			'./app/src/app'
		]
	},
	output: {
		path: path.join(__dirname, '..', '/app/dist'),
		filename: 'js/[name]-[chunkhash].js',
		publicPath: '//localhost:3000/dist/', //or your host
		chunkFilename: '[name]-[chunkhash].chunk.js'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(true),
		new webpack.optimize.DedupePlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				// Useful to reduce the size of client-side libraries, e.g. react
				NODE_ENV: JSON.stringify('production')
			},
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		//new webpack.optimize.CommonsChunkPlugin('common-[chunkhash].js'),
		new ExtractTextPlugin('css/[name]-[chunkhash].css', {
			allChunks: true
		}),
		new htmlWebpackPlugin({
			title: 'Ddx',
			filename: 'index.html',
			template: './app/src/index.template.html',
			//favicon: path.join(__dirname, 'assets', 'images', 'favicon.ico')
		})
	],
	postcss: [
		require('autoprefixer-core'),
		require('postcss-color-rebeccapurple'),
		require('cssnext')
	],
	resolve: {
		modulesDirectories: [
			'src',
			'bower_components',
			'node_modules'
		],
		extensions: ['', '.json', '.js']
	},
	module: {
		loaders: [
			{test: /\.js$/, loaders: ['babel'], exclude: /node_modules/},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss')
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
			},
			{test: /\.(png|jpg)$/, loader: "url-loader?mimetype=image/png"},
			{test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
			{test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
		]
	}
};
