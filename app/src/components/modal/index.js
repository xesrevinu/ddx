/**
 * Created by kee on 15/9/28.
 */
import React, { Component } from 'react';
import { assign } from 'lodash';
import Modal from 'react-modal';
import styles from './styles/index.styl';


const createModalStyle = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.73)'
  },
  content: {
    border: 'none',
    borderRadius: '3px',
    transition: 'all .5s'
  }
};

Modal.setAppElement('#app');

class createModal extends Component {
  render() {
    const { children, style, ...others } = this.props;
    const styled = assign({}, style, createModalStyle);
    return (
      <Modal {...others} style={styled}>
        <div className={styles.close}>
          <button className="btn btn-close" onClick={this.props.onRequestClose}>关闭</button>
        </div>
        <div className={'clearify ' + styles.content }>
          {children}
        </div>
      </Modal>
    );
  }
}

const replyModalStyle = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.73)'
  },
  content: {
    border: 'none',
    borderRadius: '3px',
    transition: 'all .5s',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginLeft: '-20%',
    marginTop: '-20%'
  }
};
class replyModal extends Component {
  render() {
    const { children, style, ...others } = this.props;
    const styled = assign({}, replyModalStyle, style);
    return (
      <Modal {...others} style={styled}>
        {children}
      </Modal>
    );
  }
}
export {
  createModal,
  replyModal
};
export default replyModal;
