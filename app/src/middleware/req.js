export default function req(ref) {
  const dispatch = ref.dispatch;
  // const state = ref.getState();
  return (next)=> (action)=>{
    if (typeof action === 'function') {
      return action(dispatch);
    }
    const { promise, types, before, after, onData, onError, ...rest } = action;
    if (!promise || !types) {
      return next(action);
    }
    const [REQUEST, SUCCESS, FAILURE] = types;
    next({...rest, type: REQUEST});
    return promise().then((data)=>{
      const result = onData(data);
      if (before) {
        before({
          dispatch,
          getState: ref.getState
        });
      }
      return result;
    }).then(result=>{
      next({...rest, result, type: SUCCESS});
      return after ? after() : '';
    }, err=>{
      const error = onError(err);
      return next({...rest, error, type: FAILURE});
    }).catch(err=> {
      console.error('MIDDLEWARE ERROR:', err);
      const error = onError(err);
      next({...rest, error, type: FAILURE});
    });
  };
}
