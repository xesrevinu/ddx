import React, { Component, PropTypes as Types } from 'react';
import Codemirror from 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/mode/overlay';
import 'codemirror/theme/base16-light.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import './styles/index.scss';

function renderEditor(id) {
  return Codemirror.fromTextArea(document.getElementById(id), {
    mode: 'gfm',
    lineNumbers: false,
    matchBrackets: true,
    lineWrapping: true,
    theme: 'base16-light',
    extraKeys: {'Enter': 'newlineAndIndentContinueMarkdownList'}
  });
}

export default class Editor extends Component {
  static propTypes = {
    content: Types.string.isRequired,
    onChange: Types.func.isRequired,
    id: Types.string.isRequired
  }
  componentDidMount() {
    if (!this.editor) {
      this.editor = renderEditor(this.props.id);
    }
    this.editor.on('change', (e)=>{
      this.props.onChange(e);
    });
  }
  componentWillUnmount() {
    this.editor = null;
    document.getElementById(this.props.id).remove();
  }
  render() {
    return (
      <textarea id={this.props.id} defaultValue={this.props.content || ''} ref={this.props.ref} placeholder="写点什么吧...." />
    );
  }
}
