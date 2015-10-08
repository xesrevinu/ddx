//import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import req from './req'

const logger = createLogger();

export default ()=>{
  return [
    req,
    thunk,
    logger
  ]
}
