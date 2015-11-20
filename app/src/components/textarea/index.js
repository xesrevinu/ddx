import React, { Component, PropTypes as Types } from 'react';

function getCodemirror(done) {
  require.ensure([], require=>{
    const Codemirror = require('codemirror/lib/codemirror');
    require('codemirror/addon/mode/overlay');
    require('codemirror/mode/gfm/gfm');
    require('codemirror/mode/javascript/javascript');
    require('codemirror/mode/markdown/markdown');
    require('codemirror/theme/base16-light.css');
    require('codemirror/lib/codemirror.css');
    require('./styles/index.styl');

    return done({
      Codemirror
    });
  });
}

function renderEditor(Codemirror, ele) {
  return Codemirror.fromTextArea(ele, {
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
      }, ()=>{
        if (!this.editor) {
          this.editor = renderEditor(Codemirror, this.refs[this.props.id]);
        }
        this.editor.on('change', (e)=>{
          this.props.onChange(e);
        });
      });
    });
  }
  render() {
    return (
      <div>
        {this.state.loading ? (
          <p>loading</p>
        ) : (
          <textarea id={this.props.id}
                    ref={this.props.id}
                    defaultValue={this.props.content} />
        )}
      </div>
    );
  }
}
