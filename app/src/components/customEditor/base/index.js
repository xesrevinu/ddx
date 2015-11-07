/**
 * Created by kee on 15/11/06.
 */
import React, { Component, PropTypes as Types } from 'react';
import styles from './styles/index.scss';

export default class Defaults extends Component {
  static PropTypes = {
    onClose: Types.func.isRequired,
    header: Types.any
  }
  render() {
    return (
      <div>
        <div className={styles.header}>
          <span className={styles.text}>{this.props.header}</span>
          <button className="btn btn-close" style={{float: 'right'}} onClick={this.props.onClose}>关闭</button>
        </div>
        <div className={styles.editorArea}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
