/**
 * Created by kee on 15/9/27.
 */
import React, {Component, PropTypes as Types} from 'react';
import getTypeComponent from '../customTypeComponent';
import styles from './styles/index.scss';

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
