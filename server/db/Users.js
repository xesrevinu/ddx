/**
 * Created by kee on 15/10/2.
 */
import db from './connection';

export default {
  getAuth(username) {
    const users = db.get('users');
    return new Promise((resolve, reject)=>{
      const query = {
        email: username
      };
      users.findOne(query, (err, data)=>{
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  },
  createUser(body) {
    const users = db.get('users');
    return new Promise((resolve, reject)=>{
      const newUser = {
        ...body,
        create_time: Date.now()
      };
      users.insert(newUser, (err, data)=>{
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  },
  userExist(email) {
    const users = db.get('users');
    return new Promise((resolve, reject)=>{
      const query = {
        email: email
      };
      users.find(query, (err, data)=>{
        if (err) {
          return reject(err);
        }
        if (data === null || data.length === 0) {
          return resolve(true);
        }
        return resolve(false);
      });
    });
  }
};
