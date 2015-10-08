/**
 * Created by kee on 15/9/25.
 */
import koa from 'koa'
import serve from 'koa-static'
import Router from 'koa-router'
import render from 'koa-ejs'
import cors from 'koa-cors'
import parser from 'koa-bodyparser'
import logger from 'koa-logger'
import path from 'path'

let app = koa();

app.use(cors());
app.use(serve('./app'));
app.use(serve('./server/assest'));
app.use(parser());
app.use(logger());

render(app, {
	root: path.join(__dirname, '..', 'app/dist'),
	layout: false,
	viewExt: 'html',
	debug: true,
	cache: false
});

const api = require('./routes/api');
app.use(api(Router));

const routes = require('./routes/index');
app.use(routes(Router));

export default app
