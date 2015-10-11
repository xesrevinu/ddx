import React, { Component, PropTypes as Types } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Post from 'components/post';
import * as postActions from 'actions/post';
import styles from './styles/index.scss';
import base from 'styles/app.scss';

@connect(state=>({
  post: state.post
}), dispatch=>({
  actions: bindActionCreators(postActions, dispatch),
  dispatch
}))
class PostContainer extends Component {
  static propTypes = {
    actions: Types.object.isRequired,
    post: Types.object.isRequired,
  }
  componentDidMount() {
    const { dispatch } = this.props;
    const statePost = this.props.location.state.post;
    // use location state
    // cache
    if (typeof statePost !== 'function' ) {
      dispatch({
        type: 'POST_INFO_LOAD_SUCCESS',
        result: statePost
      });
    }
    const { _id } = this.props.params;
    this.props.actions.loadInfo(_id, ()=>{
      console.log('ok');
    });
  }
  render() {
    const theCachePost = this.props.location.state.post;
    const { error, post } = this.props.post;
    let content = '';
    let bb = '';
    if (this.props.post.loading) {
      bb = <p>loading</p>;
      content = <p>loading</p>;
    }
    if (error) {
      bb = <p>{error}</p>;
      if (theCachePost) {
        content = <Post post={post} less={false} cached={true} />;
      } else {
        content = <p>{error}</p>;
      }
    } else {
      content = <Post post={post} less={false} />;
      const comt = post.comments.map((comment, key)=>{
        return (
          <div key={key} className="comments">
            {comment.from} { comment.to ? '-> ' + comment.to : null }: {comment.content}
          </div>
        );
      });
      bb = (
        <div className={styles.commentBox}>
          {post.comments.length > 0 ? comt : '还没有评论~'}
        </div>
      );
    }
    return (
      <div className={base.content}>
        {content}
        <div className={base.box} style={{ marginTop: '20px' }}>
          <div className={styles.views}>
            <ul>
              <li>{` 评论<${post.comments.length}>`}</li>
              <li>{` 浏览<${post.views}> `}</li>
              <li>{` 相关<${post.about.length}> `}</li>
            </ul>
          </div>
        </div>
        <div className={base.box} style={{ marginTop: '20px' }}>
          {bb}
        </div>
      </div>
    );
  }
}
export default PostContainer;
