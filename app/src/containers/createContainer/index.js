/**
 * Created by kee on 15/9/28.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from '../../actions/post';
import base from '../../styles/app.scss';
import styles from './styles/index.scss';

@connect(state=>({
  post: state.post
}), dispatch=>({
  postActions: bindActionCreators(postActions, dispatch)
}))
class CreateContainer extends Component {
  state = {
    content: ''
  }
  onContent(e) {
    const value = e.target.value;
    this.setState({
      content: value
    });
  }
  post() {
    const newPost = {
      title: this.refs.title.value,
      content: this.state.content,
      type: 'Text',
      create_time: Date.now()
    };
    for (const i of [this.refs.Image, this.refs.Text, this.refs.Music]) {
      if (i.checked) {
        newPost.type = i.value;
      }
    }
    this.props.postActions.createPost(newPost, ()=>{
      console.log('done');
    });
  }
  render() {
    return (
			<div className={base.content}>
      <div className={styles.header}>
        <p className={styles.h1}>发布</p>
      </div>
      <div>
        <from>
          <div>
            标题
            <div>
              <input type="text" ref="title" />
            </div>
          </div>
          <div>
            内容
            <div className={styles.contentBox}>
              <textarea value={this.state.content} onChange={this.onContent.bind(this)} className={styles.content} />
            </div>
          </div>
          <div>
            添加封面
          </div>
          <div>
            类型
            <div>
            <label><input name="type" type="radio" value="Text" defaultChecked ref="Text" />Text </label>
            <label><input name="type" type="radio" value="Music" ref="Music" />Music </label>
            <label><input name="type" type="radio" value="Image" ref="Image"/>Image </label>
            </div>
          </div>

          <div>
            <input type="submit" value="发布" onClick={this.post.bind(this)} />
          </div>
        </from>
      </div>
			</div>
		);
  }
}

export default CreateContainer;
