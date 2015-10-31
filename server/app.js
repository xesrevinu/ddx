/**
 * Created by kee on 15/9/25.
 */
import http from 'http';
import koa from 'koa';
import serve from 'koa-static';
import Router from 'koa-router';
import render from 'koa-ejs';
import cors from 'koa-cors';
import parser from 'koa-bodyparser';
import logger from 'koa-logger';
import compress from 'koa-compress';
import path from 'path';

const app = koa();

app.experimental = true;
app.use(logger());
app.use(cors());
app.use(parser());
app.use(compress({
  level: require('zlib').Z_BEST_COMPRESSION
}));
app.use(serve('./app'));
app.use(serve('./server/assest'));

render(app, {
  root: path.join(__dirname, '..', 'app/dist'),
  layout: false,
  viewExt: 'html',
  debug: true,
  cache: true
});

const api = require('./routes/api');
app.use(api(Router));

const routes = require('./routes/index');
app.use(routes(Router));

app.on('error', error=>{
  console.error(error);
});

const server = http.createServer(app.callback());
const io = require('socket.io')(server);

const sockets = require('./sockets');
sockets(io);

export default server;
