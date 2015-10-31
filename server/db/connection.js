/**
 * Created by kee on 15/9/26.
 */
import mongoose from 'mongoose';

export default async ()=> new Promise((resolve, reject)=>{
  mongoose.connect('mongodb://localhost/ddxblog_test', (error)=>{
    if (error) {
      reject(error.message);
    }
    resolve();
  });
});
