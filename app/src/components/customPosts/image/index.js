/**
 * Created by kee on 15/10/30.
 */
import React from 'react';
import { Link } from 'react-router';
import Defaults, { Markdown } from '../base';
import styles from './styles/index.styl';

export default (props)=>{
  const { content, cover, _id } = props.post;
  return (
    <Defaults {...props}>
      <div className={styles.cover}>
        <Link to={`/post/${_id}`}>
          <img src={cover} />
        </Link>
        <div className={styles.img}>
          <Markdown content={content} />
        </div>
      </div>
    </Defaults>
  );
};
