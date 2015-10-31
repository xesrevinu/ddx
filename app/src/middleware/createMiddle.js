/**
 * Created by kee on 15/9/22.
 */
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
