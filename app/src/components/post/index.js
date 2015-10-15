/**
 * Created by kee on 15/9/27.
 */


import React, {Component, PropTypes as Types} from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import styles from './styles/index.scss';

export default class Post extends Component {
  static propTypes = {
    post: Types.object.isRequired,
    less: Types.bool,
    cached: Types.bool
  }
  static contextTypes = {
    router: Types.object
  }
  render() {
    const { title, content, _id, cover} = this.props.post;
    const time = moment().format('lll');
    const img = cover ? (
      <div className={styles.cover}>
        <Link to={`/post/${_id}`} state={{ post: this.props.post }} >
          <img src={cover} alt="cover" />
        </Link>
      </div>
    ) : null;
    return (
			<div className={styles.posts}>
				{img}
				<div className={styles.caption}>
					<Link to={`/post/${_id}`}>{title} </Link>
					{!this.props.less ? (
						<div>
							<p>{content}</p>
						</div>
					) : null}
				</div>
				<div className={styles.panel}>
					<span className={styles.time}>
						{time}
					</span>
					<div className={styles.actions}>
						<span className={styles.text}>like</span>
						{this.props.cached ? (
							<span	className={styles.cached}>cached</span>
						) : null}
					</div>
				</div>
			</div>
		);
  }
}
