/**
 * Created by kee on 15/9/26.
 */
import db from './connection';

export default {
  getPosts() {
    const posts = db.get('posts');
    return new Promise((resolve, reject)=> {
      posts.find({}, (err, data)=> {
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
    const { name, id, content } = body;
    if (!name || !id || !content) {
      return Promise.reject(new Error('字段不全'));
    }
    return new Promise((resolve, reject)=> {
      const newPost = {
        name,
        id,
        content,
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
