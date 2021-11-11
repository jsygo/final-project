import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-tomorrow_night';

import AppContext from '../lib/app-context';

import TabNavBar from '../components/tab-nav';

export default class EditorContainer extends Component {
  constructor(props) {
    super(props);
    const { html, css, javascript } = this.props.editorValues;
    this.state = {
      currentEditor: this.props.currentEditor,
      editorLanguages: ['html', 'css', 'javascript'],
      theme: 'tomorrow_night',
      currentProjectId: this.props.currentProjectId,
      html,
      css,
      javascript
    };
  }

  componentDidUpdate() {
    if (this.state.currentEditor !== this.props.currentEditor) {
      this.setState({
        currentEditor: this.props.currentEditor
      });
    }
    const { html, css, javascript } = this.props.editorValues;
    if (html !== this.state.html || css !== this.state.css || javascript !== this.state.javascript) {
      this.setState({
        html,
        css,
        javascript
      });
    }
  }

  render() {
    return (
      <>
        <TabNavBar
          buttons={this.props.editorLabels}
          onClick={this.props.onEditorLabelsClick}
          currentTab={this.state.currentEditor}
        />
        {this.state.editorLanguages.map(editorLanguage => {
          const isHidden = this.state.currentEditor.toLowerCase() === editorLanguage
            ? ''
            : 'hidden';
          return (
            <AceEditor
              mode={editorLanguage}
              theme={this.state.theme}
              onChange={this.props.handleEditorValueChange}
              name={`${editorLanguage}Editor`}
              width="100%"
              height="calc((100vh) - 65px)"
              className={`${isHidden} editor`}
              key={editorLanguage}
              showGutter={false}
              value={this.state[editorLanguage]}
              setOptions={{ useWorker: false }}
            />
          );
        })}
      </>
    );
  }
}

EditorContainer.contextType = AppContext;
