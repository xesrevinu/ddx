/**
 * Created by kee on 15/9/25.
 */
import React, { Component, PropTypes as Types } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import cls from 'classnames'
import * as postsActions from 'actions/posts'
import Me from 'components/me'
import Post from 'components/post'
import base from 'styles/app.css'
import styles from './styles/index.css'

const c = ['Post', 'Image', 'Music', 'Text'];

class Posts extends Component{
  static propTypes = {
    posts:Types.array.isRequired
  }
  render(){
    let posts = this.props.posts.map((k, i)=>{
    	return <Post post={k} less={true} key={i}/>
  	})
    return (
      <div>
        {posts}
      </div>
    )
  }
}
class More extends Component{
  state = {
    show:false,
    type:'Post'
  }
  showPanel(){
    this.setState({
      show:!this.state.show
    })
  }
  switchPanel(type, e){
    //TODU
    if(c.includes(type)){
      this.setState({
        type:type
      })
    }
  }
  render(){
    let show = cls({
      [styles.panel]:true,
      [styles.hide]:true,
      [styles.show]:this.state.show
    })
    return (
      <div className={styles.title} onClick={this.showPanel.bind(this)}>
        All · {this.state.type}
        <div className={show} >
          <ul>
            {c.map((t, i)=>{
              return <li onClick={this.switchPanel.bind(this,t)} key={i}>{t}</li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}

@connect(state=>({
    posts:state.posts
}))
class IndexContainer extends Component{
    componentDidMount(){
      let { dispatch } = this.props;
      this.postsActions = bindActionCreators(postsActions, dispatch);
      this.postsActions.load();
    }
    render(){
      let history = this.props.history;
      return (
        <div className={base.content}>
            <Me />
            <More />
            {this.props.posts.loading
              ? <div>loading</div>
              : <Posts posts={this.props.posts.posts}/> }
        </div>
      )
    }
}
export default IndexContainer
