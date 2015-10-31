/**
 * Created by kee on 15/9/25.
 */
import { Post, User } from '../db/index';
import moment from 'moment';
import webtoken from 'jsonwebtoken';

/**
 * Api路由
 * @param  {Function} Router
 * @return {Function}
 */
export default function(Router) {
  const router = new Router({
    prefix: '/api'
  });

  router.get('/posts', async function() {
    let { showType } = this.query;
    if (showType === 'all') {
      showType = null;
    }
    if (showType) {
      showType.toLowerCase();
    }else {
      showType = null;
    }
    try {
      const posts = await Post.getPosts(showType);
      this.body = {
        posts: posts,
        msg: 'ok'
      };
    }catch (e) {
      this.body = {
        error: 'error'
      };
    }
  });

  router.post('/posts', async function() {
    const body = this.request.body;
    try {
      const newPost = await Post.createPost(body);
      this.body = {
        msg: '创建成功',
        post: newPost
      };
    } catch (e) {
      console.error(e);
      this.body = {
        error: 'create error'
      };
    }
  });

  router.get('/posts/:_id', async function() {
    const { _id } = this.params;
    const post = await Post.getPost(_id);
    if (!post) {
      this.body = {
        error: 'post not found'
      };
      return;
    }
    // 增加浏览次数
    post.views++;
    try {
      const body = {
        post: post,
        msg: 'ok'
      };
      this.body = body;
      post.save();
    } catch (e) {
      this.status = 403;
      this.body = 'err';
    }
  });

  router.post('/comments/:id', async function() {
    const { id } = this.params;
    const body = this.request.body;
    try {
      this.body = await Post.addComments(id, body);
    } catch (e) {
      console.error(e);
    }
  });

  router.get('/valid', async function() {
    const accessToken = this.headers['x-access-token'];
    const token = accessToken.split(' ')[1];
    // TODO 验证token过期时间
    try {
      const decoded = webtoken.verify(token, 'keys');
      // 是否过期
      if (decoded.exp <= Date.now() ) {
        this.body = {
          error: '登录状态已过期，请重新登录'
        };
        return;
      }
      if (decoded) {
        // token is ok
        this.body = {
          token,
          error: '',
          msg: '登陆成功'
        };
        return;
      }
    } catch (err) {
      this.body = {
        error: 'no login'
      };
    }
  });

  router.post('/login', async function() {
    const body = this.request.body;
    const { username, password } = body;
    const exist = await User.userExist(username);
    if (!exist) {
      this.body = {
        error: '账号不存在'
      };
      this.status = 401;
      return;
    }
    const userAuthInfo = await User.getAuth(username);
    if (password !== userAuthInfo.password) {
      this.body = {
        error: '密码错误'
      };
      this.status = 403;
      return;
    }
    const userInfo = await User.getInfo(userAuthInfo._id);
    const playload = {
      user: userInfo
    };
    const expires = moment().add(7, 'days').valueOf();
    const token = webtoken.sign(playload, 'keys', {
      issuer: userInfo._id,
      expiresIn: expires
    });
    this.body = {
      token,
      error: '',
      msg: '登陆成功'
    };
  });


  return router.routes();
}
