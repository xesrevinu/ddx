/**
 * Created by kee on 15/9/22.
 */
var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var host = 4000;

var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};
var babelLoaderQuery = _.assign({}, babelrcObject, babelrcObjectDevelopment);
delete babelLoaderQuery.env;

babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
if (babelLoaderQuery.plugins.indexOf('react-transform') < 0) {
  babelLoaderQuery.plugins.push('react-transform');
}

babelLoaderQuery.extra = babelLoaderQuery.extra || {};
if (!babelLoaderQuery.extra['react-transform']) {
  babelLoaderQuery.extra['react-transform'] = {};
}
if (!babelLoaderQuery.extra['react-transform'].transforms) {
  babelLoaderQuery.extra['react-transform'].transforms = [];
}
babelLoaderQuery.extra['react-transform'].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module']
});

module.exports = {
	devtool: 'inline-source-map',
	target: 'web',
	context: path.resolve(__dirname, '..'),
	entry: {
		app: [
			'webpack-hot-middleware/client',
			'./app/src/app'
		]
	},
	output: {
		path: path.join(__dirname, '..', '/app/dev'),
		filename: 'js/bundle.js',
		publicPath: '//localhost:'+host+'/',
		chunkFilename: '[id].bundle.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				// Useful to reduce the size of client-side libraries, e.g. react
				NODE_ENV: JSON.stringify('development')
			},
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true
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
		extensions: ['', '.js', '.jsx', '.json']
	},
	module: {
		loaders: [
			{test: /\.js$/, loaders: ['babel?' + JSON.stringify(babelLoaderQuery), 'eslint'], exclude: /node_modules/},
			{test: /\.json$/, loader: 'json'},
			{
				test: /\.css$/,
				loaders: ['style','css', 'postcss']
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss', 'sass']
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
