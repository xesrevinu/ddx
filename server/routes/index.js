import React from 'react'
//import Hello from '../public/src/app'

export default function (router){

  router.get('/',function *(){
    //let body = React.renderToString(<Hello />);

    yield this.render('index')
  })

  return router.routes()
}
