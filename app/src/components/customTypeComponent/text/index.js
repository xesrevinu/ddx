/**
 * Created by kee on 15/10/30.
 */
import React from 'react';
import styles from './styles/index.scss';
import Defaults, { Markdown } from '../base';

export default (props)=>{
  const { content } = props.post;
  return (
    <Defaults {...props}>
      <div className={styles.text}>
        <Markdown content={content} />
      </div>
    </Defaults>
  );
};
