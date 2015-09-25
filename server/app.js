import koa from 'koa'
import serve from 'koa-static'
import Router from 'koa-router'
import render from 'koa-ejs'
import path from 'path'

var app = koa();

app.use(serve('./app'));

render(app, {
    root: path.join(__dirname,'..', 'app/dist'),
    layout: false,
    viewExt: 'html',
    debug: true,
    cache: false
});

var router = new Router();
var routes = require('./routes/index');
app.use(routes(router));

module.exports = app;
