export default function req(ref){
  const dispatch = ref.dispatch
  const state = ref.getState()
  return (next)=> (action)=>{
    if(typeof action =='function') {
      return action(dispatch)
    }
    const { promise, types, before, after, examine, ...rest }  = action
    if(!promise){
      return next(action);
    }
    const [REQUEST, SUCCESS, FAILURE] = types;
    next({...rest, type: REQUEST});
    return promise()
      .then((data)=>{
        let result = examine(data)
        if(before){
          before({
            dispatch,
            getState:ref.getState
          })
          // return new Promise((resolve, reject)=>{
          //判断是否异步，不是直接resolve
          //TUDO
          //   before({
          //     dispatch,
          //     getState:ref.getState
          //   })
          //   return resolve(result)
          //    (c)=>{
          //      return resolve('ok')
          //    }
          //   问题在这怎么能知道是否调用最后这个回调 没调用就resolve,调用了就等回调
          // })
        }
        return result
      })
      .then(result=>{
        next({...rest, result, type: SUCCESS});
        return after ? after() : ''
      }, error=>{
        return next({...rest, error, type: FAILURE})
      })
      .catch((error)=> {
        console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      })
  }
}
