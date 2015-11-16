/**
 * Created by kee on 15/10/30.
 */
import React, { Component, PropTypes as Types } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import hljs from 'highlight.js';
import markdownIt from 'markdown-it';
import 'highlight.js/styles/solarized_dark.css';
import styles from './styles/index.styl';

const md = markdownIt({
  html: true,
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, code).value;
      } catch (e) {
        console.error(e);
      }
    }
    return '';
  }
});

function renderMark(content) {
  return {
    __html: md.render(content)
  };
}

class Markdown extends Component {
  static propTypes = {
    content: Types.string.isRequired
  }
  render() {
    return (
      <div className={styles.out} dangerouslySetInnerHTML={renderMark(this.props.content)}>
      </div>
    );
  }
}

@connect(state=>({
  user: state.auth.user
}))
export default class Defaults extends Component {
  static propTypes = {
    post: Types.object.isRequired,
    params: Types.object,
    header: Types.bool,
    footer: Types.bool
  }
  static defaultProps = {
    params: {},
    header: true,
    footer: true
  }
  renderHeader() {
    let style = {};
    if (this.props.post.type === 'text') {
      style = {
        borderBottom: '1px solid #dad3d3'
      };
    }
    const { create_time, _id, author } = this.props.post;
    const time = moment(create_time).format('MMMM D - YYYY');
    return (
      <div className={styles.panel + ' ' + styles.header} style={style}>
        <div>
          {author ? author.name + ' /' : null } <Link to={`/post/${_id}`} className={styles.time} title={moment(create_time).format('lll')}>
            {time}
          </Link>
        </div>
      </div>
    );
  }
  renderFooter() {
    const { _id } = this.props.post;
    return (
      <div className={styles.panel}>
        <div className={styles.actions}>
          {!this.props.params._id ? (
            <Link className={styles.text + ' btn'} to={`/post/${_id}`}>详情</Link>
          ) : null}
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className={styles.posts}>
        {this.props.header ? this.renderHeader() : null}
        {this.props.children}
        {this.props.footer ? this.renderFooter() : null}
      </div>
    );
  }
}

export {
  Markdown
};
