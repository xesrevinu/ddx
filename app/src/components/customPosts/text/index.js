/**
 * Created by kee on 15/10/30.
 */
import React from 'react';
import Defaults, { Markdown } from '../base';
import styles from './styles/index.styl';

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
