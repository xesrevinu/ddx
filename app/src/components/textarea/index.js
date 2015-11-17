import React, { Component, PropTypes as Types } from 'react';

function getCodemirror(done) {
  require.ensure([], require=>{
    const Codemirror = require('codemirror/lib/codemirror');
    require('codemirror/addon/mode/overlay');
    require('codemirror/theme/base16-light.css');
    require('codemirror/mode/markdown/markdown');
    require('codemirror/mode/markdown/markdown');
    require('codemirror/mode/markdown/markdown');
    require('codemirror/mode/gfm/gfm');
    require('codemirror/mode/css/css');
    require('codemirror/mode/javascript/javascript');
    require('codemirror/lib/codemirror.css');
    require('./styles/index.styl');

    return done({
      Codemirror
    });

  });
}

function renderEditor(Codemirror, id) {
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
  state = {
    loading: true
  }
  componentDidMount() {
    getCodemirror(({Codemirror})=>{
      this.setState({
        loading: false
      });
      if (!this.editor) {
        this.editor = renderEditor(Codemirror, this.props.id);
      }
      this.editor.on('change', (e)=>{
        this.props.onChange(e);
      });
    });
  }
  componentWillUnmount() {
    this.editor = null;
    document.getElementById(this.props.id).remove();
  }
  render() {
    return (
      <div>
        {this.state.loading ? (
          <p>loading</p>
        ) : (
          <textarea id={this.props.id} defaultValue={this.props.content || ''} ref={this.props.ref} placeholder="写点什么吧...." />
        )}
      </div>
    );
  }
}
