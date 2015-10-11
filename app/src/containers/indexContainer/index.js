/**
 * Created by kee on 15/9/25.
 */
import React, { Component, PropTypes as Types } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cls from 'classnames';
import * as postsActions from 'actions/posts';
import Me from 'components/me';
import Post from 'components/post';
import base from 'styles/app.scss';
import styles from './styles/index.scss';

const menu = ['Post', 'Image', 'Music', 'Text'];

class Posts extends Component {
  static propTypes = {
    posts: Types.array.isRequired
  }
  render() {
    const posts = this.props.posts.map((post, key)=>{
      return <Post post={post} less={true} key={key} />;
    });
    return (
      <div>
        {posts}
      </div>
    );
  }
}

class More extends Component {
  state = {
    show: false,
    type: 'Post'
  }
  showPanel() {
    this.setState({
      show: !this.state.show
    });
  }
  switchPanel(type) {
    // TODU
    if (menu.includes(type)) {
      this.setState({
        type: type
      });
    }
  }
  render() {
    const show = cls({
      [styles.panel]: true,
      [styles.hide]: true,
      [styles.show]: this.state.show
    });
    return (
      <div className={styles.title} onClick={this.showPanel.bind(this)}>
        All · {this.state.type}
        <div className={show} >
          <ul>
            {menu.map((item, key)=>{
              return <li onClick={this.switchPanel.bind(this, item)} key={key}> {item} </li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

@connect(state=>({
  posts: state.posts
}))
class IndexContainer extends Component {
    componentDidMount() {
      const { dispatch } = this.props;
      this.postsActions = bindActionCreators(postsActions, dispatch);
      this.postsActions.load();
    }
    render() {
      return (
        <div className={base.content}>
            <Me />
            <More />
            {this.props.posts.loading
              ? <div>loading</div>
              : <Posts posts={this.props.posts.posts}/> }
        </div>
      );
    }
}
export default IndexContainer;
