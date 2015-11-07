/**
 * Created by kee on 15/9/25.
 */
var webpack = require('webpack');
var path = require('path')
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');
var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, '../dev'),
    publicPath: '',
    quiet: !true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    stats: {
      colors: true
    },
    proxy: {
      "/api/*": "http://localhost:3000/api",
      "/*.*": "http://localhost:3000"
    }
});
server.use(require('webpack-hot-middleware')(compiler));
server.listen(4000, 'localhost', function (err) {
  if (err) {
      console.log(err);
  }
  console.log('Listening at localhost:4000');
});
