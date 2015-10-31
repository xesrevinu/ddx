/**
 * Created by kee on 15/9/28.
 */
import React, { Component, PropTypes as Types } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import socket from '../../sockets';
import Editor from '../../components/editor/index';
import * as postsActions from '../../actions/posts';
import base from '../../styles/app.scss';
import styles from './styles/index.scss';

@connect(state=>({
  posts: state.posts,
  auth: state.auth,
  user: state.auth.user,
  config: state.auth.config
}), dispatch=>({
  postsActions: bindActionCreators(postsActions, dispatch)
}))
class CreateContainer extends Component {
  static propTypes = {
    posts: Types.object.isRequired,
    auth: Types.object.isRequired,
    user: Types.object,
    config: Types.object.isRequired
  }
  state = {
    content: '# Hello Ddx \n```js\nconst papa = "这是一个简单的日记web程序，记录，分享自己喜欢的文字，音乐，照片"\n``` ',
    modalIsOpen: false
  }
  post() {
    if (!this.props.auth.logind) {
      return alert('请先登录');
    }
    const newPost = {
      // title: this.refs.title.value,
      content: this.state.content,
      type: '',
      author: {
        name: this.props.user.name,
        email: this.props.user.email
      },
      create_time: Date.now()
    };
    for (const i of this.props.config.menuTypes) {
      const selectd = this.refs[i.type];
      if (selectd.checked) {
        newPost.type = selectd.value;
      }
    }
    this.props.postsActions.createPost(newPost, (post)=>{
      // this.reset();
      socket.emit('create:post', post);
      alert('创建成功');
    });
  }
  update(e) {
    this.setState({
      content: e.getValue()
    });
  }
  reset() {
    this.setState({
      content: ''
    });
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  render() {
    const config = this.props.config;
    return (
			<div className={base.content}>
        <div>
          <p className={styles.h1}>发布</p>
        </div>
        <div className="ctrl">
          <div className={styles.header}>
            类型
            <div ref="dd" className={styles.postType}>
              {config.menuTypes.map((k, i)=>{
                return (
                  <label key={i}>
                    {/* 默认为第一个选项 */}
                    <input name="type" type="radio" value={k.type} defaultChecked={i === 0} ref={k.type} />{k.text}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        <div className="ctrl">
          <div className={styles.editor}>
            <Editor content={this.state.content} onChange={this.update.bind(this)} />
          </div>
        </div>
        <div className="ctrl">
          <input type="submit" value="发布" className="btn btn-done" onClick={this.post.bind(this)} />
        </div>
		 </div>
		);
  }
}

export default CreateContainer;
