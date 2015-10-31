/**
 * Created by kee on 15/9/26.
 */
import PostModel from './schema/post';

/**
 * 文章数据操作方法
 *
 * */
const Post = {
  /**
   *  获取所有文章
   *  @param {String} type 文章类型
   *  @api public
   * */
  getPosts(type) {
    const query = {};
    if (type) query.type = type;
    const sort = {
      _id: -1
    };
    return PostModel
      .find(query, {
        about: 0,
        comments: 0
      })
      .sort(sort)
      .exec();
  },
  /**
   * 根据id获取某文章信息
   * @param {ObjectId} id
   * @return {PostSchema} post
   * @api public
   * */
  getPost(id) {
    const query = {
      _id: id
    };
    return PostModel
      .findOne(query)
      .exec();
  },
  /**
   * 创建文章
   * @param {Object} body
   * @api public
   * */
  async createPost(body) {
    return await new PostModel(body).save();
  },
  /**
  * 增加评论
  * @param {ObjectId} id
  * @param {Object} comment
  * @api public
  * */
  addComments(id, comment) {
    const query = {
      _id: id
    };
    /* TODO push会导致评论会以相反的时间显示出来 */
    const update = {
      $push: {
        comments: comment
      }
    };
    return PostModel
      .update(query, update)
      .exec();
  }
};

export default Post;
