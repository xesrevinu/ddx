/**
 * Created by kee on 15/9/27.
 */
import 'moment/locale/zh-cn';
import React, { Component, PropTypes as Types } from 'react';
import QueueAnim from 'rc-queue-anim';
import Navbar from '../../components/navbar';

class RootContainer extends Component {
  static propTypes = {
    children: Types.element.isRequired
  }
  render() {
    const { pathname } = this.props.location;
    return (
      <QueueAnim interval={600}
                 delay={300}
                 leaveReverse={true}>
        <div key={0}>
          <Navbar path={pathname} />
        </div>
        <div key={1} style={{marginTop: '20px'}}>
          {this.props.children}
        </div>
        <div key={2} style={{textAlign: 'center', color: 'white', height: '70px', fontSize: '17px'}}>
          Designed & Powerd by <a href="http://weibo.com/u/2122018774" style={{color: 'rgb(52, 245, 205)'}}>xiaokekeT</a>
          <p>Github: <a href="github.com/xiaokekeT" style={{color: '#fff'}}>xiaokekekT</a></p>
        </div>
      </QueueAnim>
    );
  }
}
export default RootContainer;
