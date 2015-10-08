import React, { Component, PropTypes as Types } from 'react'
import Post from 'components/post'
import styles from './styles/index.css'
import base from 'styles/app.css'


class PostContainer extends Component{
  render(){
    let { state } = this.props.location;
    let { post } = state;
    return (
      <div className={base.content}>
        <Post post={post} less={false}/>
        <div className={base.box} style={{marginTop:'20px'}}>
          <div className={styles.views}>
            <ul>
              <li>{" 评论<10> "}</li>
              <li>{" 浏览<10> "}</li>
              <li>{" 相关<10> "}</li>
            </ul>
          </div>
        </div>
        <div className={base.box} style={{marginTop:'20px'}}>
          
        </div>
      </div>
    )
  }
}

export default PostContainer
