/**
 * Created by kee on 15/10/2.
 */
import UserModel from './schema/user';

/**
 * 用户数据操作方法
 * */
const User = {
  /**
   * 获取用户认证信息
   * @param {String} email
   * @return {UserSchema} user 用户信息
   * */
  getAuth(email) {
    const query = {
      email: email
    };
    return UserModel
      .findOne(query, {
        isAdmin: 0
      })
      .exec();
  },
  /**
   * 获取用户信息
   * @param {ObjectId} _id
   * @return {UserSchema} user 用户信息
   * */
  getInfo(_id) {
    const query = {
      _id: _id
    };
    return UserModel
      .findOne(query, {
        password: 0
      }, {
        isAdmin: 0
      })
      .exec();
  },
  /**
   * 创建新用户
   * @param {Object} body
   * @return {userSchema} user
   * */
  async createUser(body) {
    return await new UserModel(body).save();
  },
  /**
   * 用户邮箱是否存在
   * @param {String} email
   * @return {Boolean}
   * */
  userExist(email) {
    const query = {
      email: email
    };
    return UserModel
      .findOne(query)
      .exec();
  },
  /**
   * 是否为管理员
   * @param {ObjectId}
   * @return {Boolean}
   */
  async isAdmin(_id) {
    const query = {
      _id: _id
    };
    const _isAdmin = await UserModel
      .findOne(query, {
        isAdmin: 1
      })
      .exec();
    return _isAdmin ? true : false;
  }
};

export default User;
