/**
 * Created by kee on 15/10/29.
 */
import React, { Component, PropTypes as Types } from 'react';
import Codemirror from 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/mode/overlay';
import 'codemirror/theme/base16-light.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

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
    onChange: Types.func.isRequired
  }
  componentDidMount() {
    this.editor = renderEditor('editor');
    this.editor.on('change', (e)=>{
      this.props.onChange(e);
    });
  }
  render() {
    return (
      <textarea id="editor" defaultValue={this.props.content} placeholder="...."/>
    );
  }
}
