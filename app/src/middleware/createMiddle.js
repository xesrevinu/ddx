// import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import req from './req';

const logger = createLogger();

export default ()=>{
  let middle = [
    req,
    thunk
  ];
  if (__DEVELOPMENT__) {
    middle.push(logger);
  }
  return middle;
};
