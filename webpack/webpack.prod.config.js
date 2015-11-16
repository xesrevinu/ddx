/**
 * Created by kee on 15/9/22.
 */
var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	target: 'web',
	context: path.resolve(__dirname, '..'),
	entry: {
		lib: [
			'react',
			'react-dom',
			'react-modal',
			'react-redux',
			'react-router',
			'redux',
			'redux-thunk',
			'moment',
			'rc-queue-anim',
			'jwt-decode',
			'halogen'
		],
		app: [
			'./app/src/app.js'
		]
	},
	output: {
		path: path.join(__dirname, '..', '/app/dist'),
		filename: 'js/[name]-[chunkhash].js',
		publicPath: '/dist/', // or your host
		chunkFilename: '[name]-[chunkhash].chunk.js'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				// Useful to reduce the size of client-side libraries, e.g. react
				NODE_ENV: JSON.stringify('production')
			},
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "lib",
			minChunks: Infinity
		}),
		new ExtractTextPlugin('css/[name]-[chunkhash].css', {
			allChunks: true
		}),
		new htmlWebpackPlugin({
			title: 'Ddx',
			filename: 'index.html',
			template: './app/src/index.template.html'
		}),
		new CleanPlugin(['../app/dist'])
	],
	postcss: [
		require('autoprefixer'),
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
			{
				test: /\.js$/, loader: 'babel', exclude: /node_modules/
			},
			{
				test: /\.json$/, loader: 'json'
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css!postcss')
			},
			{
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!stylus')
			},
			{
				test: /\.(png|jpg)$/,
				loader: "url-loader?mimetype=image/png"
			},
			{
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=application/font-woff"
			},
			{
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"
			}
		]
	}
};
