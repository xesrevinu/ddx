/**
 * Created by kee on 15/9/26.
 */
import mongoose, { Schema } from 'mongoose';

/**
 * 文章模型
 * @param {String} title 标题
 * @param {String} content 内容
 * @param {Number} views 被浏览次数
 * @param {Object} author 作者
 * @param {Array} comments 评论
 * @param {Array} about 相关文章
 * @param {String} type 类型
 * @param {String} cover 封面图片
 * @param {Array} images 图片
 * @param {Object} music 音乐
 * @param {Date} create_time 创建日期
 * */
const PostSchema = new Schema({
  title: String,
  content: String,
  views: {
    type: Number,
    default: 0
  },
  author: {
    name: '',
    email: ''
  },
  comments: {
    type: Array,
    default: []
  },
  about: {
    type: Array,
    default: []
  },
  type: {
    type: String,
    default: 'text'
  },
  cover: {
    type: String,
    default: ''
  },
  images: {
    type: Array,
    default: []
  },
  music: {
    cover: {
      type: String,
      default: '' /* TODO 默认封面 */
    },
    author: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    play: {
      type: Number,
      default: 0
    }
  },
  create_time: {
    type: Date,
    default: new Date()
  }
});

export default mongoose.model('Post', PostSchema);
