/**
 * Created by kee on 15/9/26.
 */
import db from './connection';
import postSchema from './schema/post';

const Posts = {
  getPosts() {
    const posts = db.get('posts');
    return new Promise((resolve, reject)=> {
      posts.find({}, {sort: { _id: -1}}, (err, data)=> {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  },
  getPost(id) {
    const posts = db.get('posts');
    const query = {
      '_id': id
    };
    return new Promise((resolve, reject)=> {
      posts.findOne(query, (err, data)=> {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  },
  createPost(body) {
    const posts = db.get('posts');
    const { title, ...other } = body;
    // TUDO 过滤字段
    if (!title) {
      return Promise.reject(new Error('字段不全'));
    }
    return new Promise((resolve, reject)=> {
      const newPost = {
        ...postSchema,
        ...body,
        create_time: Date.now()
      };
      posts.insert(newPost, (err, data)=> {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }
};

export default Posts;
