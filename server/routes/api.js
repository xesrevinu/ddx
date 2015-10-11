/**
 * Created by kee on 15/9/25.
 */
import { Posts, Users } from '../db/index';

export default function(Router) {

  const router = new Router({
    prefix: '/api'
  });

  router.get('/posts', async function() {
    this.body = await Posts.getPosts();
    // this.body = [
    //   {
    //     title:'Hello',
    //     content:'1 ',
    //     views:100,
    //     about:[
    //       1,2
    //     ],
    //     comments:[
    //       {
    //         "from":"ke",
    //         "content": "hahha ",
    //         "create_time":new Date()
    //       },
    //       {
    //         "from": "@xiao",
    //         "to": "@ke",
    //         "content": "i love you ",
    //         "create_time":new Date()
    //       },
    //       {
    //         "from": "@ke",
    //         "to": "@xiao",
    //         "content": "i love you to",
    //         "create_time": new Date()
    //       }
    //     ]
    //   },
    //   {
    //     title:'Hello',
    //     content:'2',
    //     views:10,
    //     about:[
    //       1,2,3
    //     ],
    //     comments:[
    //       {
    //         "from": "@xiao",
    //         "to": "@ke",
    //         "content": "i love you ",
    //         "create_time":new Date()
    //       }
    //     ],
    //     _id:'xxxxxxxxxxxxxxxxx'
    //   },
    //   {
    //     title:'Hello world',
    //     content:'3',
    //     views:10,
    //     about:[
    //       1,2,3,4,5,6,7
    //     ],
    //     comments:[
    //       {
    //         "from": "@xiao",
    //         "to": "@ke",
    //         "content": "i love you ",
    //         "create_time":new Date()
    //       }
    //     ],
    //     _id:'xxxxxxxxxxxxxxxxx'
    //   }
    // ]
  });

  router.post('/posts', async function() {
    const body = this.request.body;
    try {
      this.body = await Posts.createPosts(body);
    } catch (e) {
      this.body = 'create error';
    }
  });

  router.get('/posts/:_id', async function() {
    // return this.body = {
    //   title:'Hello',
    //   content:'1 ',
    //   views:100,
    //   about:[
    //     1,2
    //   ],
    //   comments:[
    //     {
    //       "from":"@ke",
    //       "content": "hahha ",
    //       "create_time":new Date()
    //     },
    //     {
    //       "from": "@xiao",
    //       "to": "@ke",
    //       "content": "i love you ",
    //       "create_time":new Date()
    //     },
    //     {
    //       "from": "@ke",
    //       "to": "@xiao",
    //       "content": "i love you to",
    //       "create_time": new Date()
    //     }
    //   ],
    //   _id:'xxxxxxxxxxxxxxxxx'
    // }
    const { _id } = this.params;
    const post = await Posts.getPost(_id);
    try {
      const body = {
        ...post,
        msg: 'ok'
      };
      this.body = body;
    } catch (e) {
      this.status = 403;
      this.body = 'err';
    }
  });

  router.post('/login', async function() {
    const body = this.request.body;
    const { username, password } = body;
    const exist = await Users.userExist(username);
    if (exist) {
      this.body = {
        error: '账号不存在'
      };
      this.status = 401;
      return;
    }
    const userInfo = await Users.getAuth(username);
    if (password !== userInfo.password) {
      this.body = {
        error: '密码错误'
      };
      this.status = 403;
      return;
    }
    this.body = {
      error: '',
      msg: '登陆成功'
    };
  });

  return router.routes();
}
