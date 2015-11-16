/**
 * Created by kee on 15/10/21.
 */
import app from '../app';
import mongoConnection from '../db/connection';

(async ()=>{
  try {
    await mongoConnection();
  } catch (e) {
    console.error('ERROR:', e);
    return;
  }
  app.listen(3000, '127.0.0.1', ()=>{
    console.log('server listen');
  });
})();
