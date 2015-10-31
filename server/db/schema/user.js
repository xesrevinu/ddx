/**
 * Created by kee on 15/9/26.
 */
import mongoose, { Schema } from 'mongoose';

/**
 * 用户模型
 * @param {String} name 昵称
 * @param {String} email 邮箱
 * @param {String} password 密码
 * @param {String} create_time 创建日期
 * */
const UserSchema = new Schema({
  name: {
    type: String,
    index: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
      sparse: true
    }
  },
  isAdmin: {
    type: String,
    default: 0
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  create_time: Date
});

export default mongoose.model('User', UserSchema);
