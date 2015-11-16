/**
 * Created by kee on 15/9/27.
 */
import React, {Component, PropTypes as Types} from 'react';
import getTypeComponent from '../customPosts';
import styles from './styles/index.styl';

export default class Post extends Component {
  static propTypes = {
    post: Types.object.isRequired,
    params: Types.object
  }
  render() {
    const { type } = this.props.post;
    return (
      <div className={styles.post}>
        {getTypeComponent(type, this.props)}
      </div>
		);
  }
}
