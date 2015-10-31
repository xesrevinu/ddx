/**
 * Created by kee on 15/9/22.
 */
export default function req(ref) {
  const { dispatch, getState } = ref;
  return (next)=> (action)=>{
    if (typeof action === 'function') {
      return action(dispatch);
    }
    const { promise, types, before, after, onData, onError, ...others } = action;
    if (!promise || !types) {
      return next(action);
    }
    const [REQUEST, SUCCESS, FAILURE] = types;
    next({...others, type: REQUEST});
    const run = ()=>{
      return promise().then((data)=>{
        return onData(data);
      }).then(result=>{
        next({...others, result, type: SUCCESS});
        return after ? after(result) : null;
      }, err=>{
        const error = onError(err);
        return next({...others, error, type: FAILURE});
      }).catch(err=>{
        console.error('MIDDLEWARE ERROR:', err);
      });
    };
    if (before) {
      let _before = before({
        dispatch,
        getState
      });
      if (!_before) {
        _before = Promise.resolve();
      }
      return _before.then(()=>{
        return run();
      }, err=>{
        const error = onError(err);
        return next({...others, error, type: FAILURE});
      }).catch(err=>{
        console.error('MIDDLEWARE ERROR:', err);
      });
    }
    run();
  };
}
