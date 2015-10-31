/**
 * Created by kee on 15/9/27.
 */
import React, { Component } from 'react';
import styles from './styles/index.scss';

class Me extends Component {
  render() {
    return (
      <div className={styles.header}>
        <header id="header">
          <div>
            <img src="/images/IMG_5053.jpg" className={styles.me}/>
          </div>
          <div>
            <p className={styles.name}>xiaokekeT</p>
          </div>
        </header>
      </div>
    );
  }
}

export default Me;
