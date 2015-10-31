/**
 * Created by kee on 15/9/28.
 */
import React, { Component } from 'react';
import Modal from 'react-modal';

const Custom = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#app');

export default class CustomModal extends Component {
  render() {
    const { children, style, ...others } = this.props;
    const styled = {
      ...Custom,
      style
    };
    return (
      <Modal {...others} style={styled}>
        {children}
      </Modal>
    );
  }
}
