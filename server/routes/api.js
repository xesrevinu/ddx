/**
 * Created by kee on 15/9/25.
 */
import { Posts, Users } from '../db/index'

export default function (Router){

  const router = new Router({
    prefix:'/api'
  });

  router.get('/posts', function *(){
    //this.body = yield Posts.getPosts()
    this.body = [
      {
        title:'Hello',
        content:'ASD'
      },
      {
        title:'Hello',
        content:'ASD'
      },
      {
        title:'Hello',
        content:'ASD'
      }
    ]
  });

  router.post('/posts', function *(){
    let body = this.request.body;
    try{
      this.body = yield Posts.createPosts(body)
    }catch(e){
      this.body = 'create error'
    }
  });

  router.get('/posts/:id', function *(){
    let id = this.params.id;
    try{
      this.body = yield Posts.getPost(id)
    }catch(e){
      this.body = 'err'
    }
  });

  router.post('/login', function *(){
    let body = this.request.body;
    let { username, password } = body;
    let exist = yield Users.userExist(username);
    if(exist){
      this.body = {
        error:'账号不存在'
      };
      return this.status = 401
    }
    const userInfo = yield Users.getAuth(username);
    if(password !== userInfo.password){
      this.body = {
        error:'密码错误'
      };
      return this.status = 403;
    }
    this.body = {
      error:'',
      msg:'登陆成功'
    }
  });

  return router.routes()
}
