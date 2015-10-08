/**
 * Created by kee on 15/9/25.
 */
import React from 'react'
//import Hello from '../public/src/app'

export default function (Router) {
	let router = new Router();
	router.get('/', function *() {
		//let body = React.renderToString(<Hello />);

		yield this.render('index')
	})
	router.get('*', function *() {
		//let body = React.renderToString(<Hello />);

		yield this.render('index')
	})
	return router.routes()
}
