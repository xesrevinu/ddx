/**
 * Created by kee on 15/9/27.
 */
import React, { Component, PropTypes as Types } from 'react';
import { bindActionCreators } from 'redux';
import { ClipLoader } from 'halogen';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { assign } from 'lodash';
import moment from 'moment';
import socket from '../../sockets';
import Post from '../../components/post';
import { replyModal as Modal } from '../../components/modal';
import * as postActions from '../../actions/post';
import base from '../../styles/app.styl';
import styles from './styles/index.styl';

@connect(state=>({
  post: state.post,
  auth: state.auth,
  user: state.auth.user
}), dispatch=>({
  actions: bindActionCreators(postActions, dispatch),
  dispatch
}))
class PostContainer extends Component {
  static propTypes = {
    user: Types.object.isRequired,
    auth: Types.object.isRequired,
    actions: Types.object.isRequired,
    post: Types.object.isRequired,
  }
  state = {
    showComment: false,
    k: 0,
    reply: {}
  }
  componentDidMount() {
    const { _id } = this.props.params;
    this.props.actions.loadInfo(_id);
    socket.on('new:comment', (comment)=>{
      if (comment.post_id === _id) {
        this.props.actions.onNewComment(comment);
      }
    });
  }
  _showComment() {
    if (!this.props.auth.logind) {
      return alert('请先登录');
    }
    this.setState({
      showComment: true
    });
  }
  _comment() {
    this._requestComment(this.state.reply, this._closeComment.bind(this));
  }
  _requestComment(reply, callback) {
    const { email, _id, name} = this.props.user;
    const { commentContent } = this.refs;
    if (!commentContent.value) {
      return false;
    }
    const comment = {
      from: name || '',
      from_id: _id,
      from_email: email,
      post_id: this.props.params._id,
      content: commentContent.value.trim(),
      create_time: Date.now()
    };
    if (reply.from) comment.to = reply;
    this.props.actions.createComment(comment, ()=>{
      socket.emit('create:comment', comment);
      return callback();
    });
  }
  _closeComment() {
    this.setState({
      showComment: false
    });
  }
  _replyComment() {
    this._requestComment(this.state.reply, this._closeReply.bind(this));
  }
  _showReply(comment) {
    if (!this.props.auth.logind) {
      return alert('请先登录');
    }
    const rep = assign({}, comment);
    if (rep.from_id === this.props.user._id) {
      return false;
    }
    delete rep.to;
    this.setState({
      showReply: true,
      reply: rep
    });
  }
  _closeReply() {
    this.setState({
      showReply: false,
      reply: {}
    });
  }
  _tabs(k) {
    this.setState({
      k: k
    });
  }
  renderComments(comments) {
    /* TODO 评论样式 */
    if (comments.length < 1) {
      return (
        <p>还没有评论~ </p>
      );
    }
    return (
      <QueueAnim leaveReverse={true}>
        {comments.map((comment, key)=>{
          return (
            <div key={key} className="comments">
              <div onClick={this._showReply.bind(this, comment)}>
                {comment.from }: { comment.to ? '@' + comment.to.from : null } {comment.content}
                {'    '}--{moment(comment.create_time).format('lll')}
              </div>
            </div>
          );
        })}
      </QueueAnim>
    );
  }
  render() {
    const { error, post } = this.props.post;
    let content = null;
    let bb = null;
    if (this.props.post.post_loading) {
      bb = <ClipLoader size="20px" color="#3ceea3" />;
      content = bb;
    }
    if (error) {
      bb = <p>{error}</p>;
      content = <p>{error}</p>;
    } else {
      content = <Post post={post} params={this.props.params}/>;
      // TODO 登陆验证
      const about = post.about.length < 1 ? ' 还没有相关的内容 ' : post.about.map((dd, key)=>{
        return (
          <div key={key}>
            {dd}
          </div>
        );
      });
      switch (this.state.k) {
        case 0:
          bb = (
            <div className={styles.commentBox}>
              <div className={styles.commentAction}>
                {this.state.showComment ? (
                  <Modal isOpen={this.state.showComment} onRequestClose={this._closeComment.bind(this)}>
                    <h2>评论</h2>
                    {post.createComment_loading ? '创建中' : null}
                    {post.createComment_error}
                    <div className={styles.addCommentBox}>
                      <textarea className={'textarea ' + styles.commentArea } ref="commentContent"/>
                    </div>
                    <div>
                      <button className="btn btn-close" onClick={this._closeComment.bind(this)}>close</button>
                      <button className={'btn btn-success ' + styles.commentPost} onClick={this._comment.bind(this)}>提交</button>
                    </div>
                  </Modal>
                ) : null}
                {this.state.showReply ? (
                  <Modal isOpen={this.state.showReply} onRequestClose={this._closeReply.bind(this)}>
                    <h2>回复-> {this.state.reply.from}</h2>
                    <i>
                      `{this.state.reply.content}`
                    </i>
                    {post.create_comment_loading ? '创建中' : null}
                    {post.create_comment_error}
                    <div className={styles.addCommentBox}>
                      <textarea className={'textarea ' + styles.commentArea } ref="commentContent"/>
                    </div>
                    <div>
                      <button className="btn btn-close" onClick={this._closeReply.bind(this)}>close</button>
                      <button className={'btn btn-success ' + styles.commentPost} onClick={this._replyComment.bind(this)}>提交</button>
                    </div>
                  </Modal>
                ) : null }
                <button className={'btn ' + styles.comment} onClick={this._showComment.bind(this)}>评论</button>
              </div>
              {this.renderComments(post.comments)}
            </div>
          );
          break;
        case 1:
          bb = (
            <span>
              此文章被查看{post.views}次
            </span>
          );
          break;
        case 2:
          bb = (
            <div>
              {about}
            </div>
          );
          break;
        default:
          return null;
      }
    }
    return (
      <div>
        <div className={base.content}>
          <ClipLoader size="20px" color="#44f" loading={this.props.post.post_loading}/>
          {!this.props.post.post_loading ? (
            <QueueAnim interval={400}
                       leaveReverse={true}
                       ease={['easeOutBack', 'easeInOutCirc']}>
              <div key={0}>
                {content}
              </div>
              <div className="box" style={{ marginTop: '20px' }} key={1}>
                <div className={styles.views}>
                  <ul>
                    <li onClick={this._tabs.bind(this, 0)}>{`评论<${post.comments.length}>`}</li>
                    <li onClick={this._tabs.bind(this, 1)}>{`浏览<${post.views}> `}</li>
                    <li onClick={this._tabs.bind(this, 2)}>{`相关<${post.about.length}> `}</li>
                  </ul>
                </div>
              </div>
              <div className="box" style={{ marginTop: '20px', padding: '10px'}} key={2}>
                {bb}
              </div>
            </QueueAnim>
          ) : null}
        </div>
      </div>
    );
  }
}
export default PostContainer;
