/**
 * Created by kee on 15/9/25.
 */
import React, { Component, PropTypes as Types } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { ClipLoader } from 'halogen';
import socket from '../../sockets';
import * as postsActions from '../../actions/posts';
import More from '../../components/more';
import Me from '../../components/me';
import Post from '../../components/post';
import base from '../../styles/app.scss';

@connect(state=>({
  posts: state.posts,
  config: state.auth.config
}), dispatch=>({
  actions: bindActionCreators(postsActions, dispatch)
}))
class IndexContainer extends Component {
  static propTypes = {
    posts: Types.object.isRequired,
    config: Types.object.isRequired
  }
  state = {
    menus: [{
      type: 'all',
      text: '所有'
    }, ...this.props.config.menuTypes]
  }
  componentDidMount() {
    this.loadPosts();
    socket.on('new:post', (newPost)=>{
      this.props.actions.onNewPost(newPost);
    });
  }
  loadPosts(type) {
    this.props.actions.load(type);
  }
  renderPosts(posts) {
    if (posts.length < 1) {
      return (
        <div className="box"> oh no 啥也木有</div>
      );
    }
    const item = posts.map((post, i )=>{
      return (
        <div key={i}>
          <Post post={post}/>
        </div>
      );
    });
    return (
      <div>
        <QueueAnim interval={[100, 600]}
                   leaveReverse={true}
                   ease={['easeOutBack', 'easeInOutCirc']}>
          {item}
        </QueueAnim>
      </div>
    );
  }
  render() {
    const posts = this.props.posts.posts;
    let content = '';
    if (!this.props.posts.posts_loading) {
      content = this.renderPosts(posts);
    }
    return (
      <div className={base.content}>
        <div>
            <Me />
            <More menus={this.state.menus}
                  done={(type)=> this.loadPosts(type) } />
        </div>
        <div>
          <ClipLoader size="20px"
                      color="#3ceea3"
                      loading={this.props.posts.posts_loading}/>
          {content}
        </div>
      </div>
    );
  }
}
export default IndexContainer;
