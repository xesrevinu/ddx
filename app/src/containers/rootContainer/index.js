/**
 * Created by kee on 15/9/27.
 */
import React, { Component } from 'react'
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import Navbar from 'components/navbar'

class RootContainer extends Component{
  render(){
    const { pathname } = this.props.location
    // <CSSTransitionGroup component="div" transitionName='example'>
    //
    // </CSSTransitionGroup>
    return (
      <div>
          <Navbar path={pathname} />
          {React.cloneElement(this.props.children || <div />, { key: pathname })}
      </div>
    )
  }
}
export default RootContainer
