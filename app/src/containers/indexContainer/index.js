/**
 * Created by kee on 15/9/25.
 */
import React, { Component, PropTypes as Types } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cls from 'classnames';
import QueueAnim from 'rc-queue-anim';
import { ClipLoader } from 'halogen';
import socket from '../../sockets';
import * as postsActions from '../../actions/posts';
import Me from '../../components/me';
import Post from '../../components/post';
import base from '../../styles/app.scss';
import styles from './styles/index.scss';

class More extends Component {
  static propTypes = {
    menus: Types.array.isRequired,
    done: Types.func.isRequired
  }
  state = {
    show: false,
    showType: 0
  }
  componentWillEnter() {

  }
  componentWillLeave() {

  }
  showPanel() {
    this.setState({
      show: !this.state.show
    });
  }
  _switchType(i) {
    const selectType = this.props.menus[i];
    this.setState({
      showType: i
    });
    this.props.done(selectType.type);
    this.showPanel();
  }
  render() {
    const menus = this.props.menus;
    const showType = menus[this.state.showType];
    const types = [];
    const show = cls({
      [styles.menus]: true,
      [styles.hide]: true,
      [styles.show]: this.state.show
    });
    if (this.state.show ) {
      menus.map((k, i)=>{
        if (i === 0) {
          return;
        }
        types.push(
          <span key={i} onClick={this._switchType.bind(this, i)}>{k.text}</span>
        );
      });
      const reload = (
        <span key={types.length + 1}
             onClick={this._switchType.bind(this, 0)}>
          Reload
        </span>
      );
      // 将reload放到最后
      types.push(reload);
    }
    return (
      <div className={styles.menu} >
        <span className={styles.selectd} onClick={this.showPanel.bind(this)}>{showType.text}</span>
        <div className={show} >
          {this.state.show ?
            <QueueAnim>
              {types}
            </QueueAnim>
          : null}
        </div>
      </div>
    );
  }
}

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
          <Me />
          <More menus={this.state.menus}
                done={(type)=> this.loadPosts(type) } />
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
