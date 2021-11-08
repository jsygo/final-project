import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-tomorrow_night';

import TabNavBar from '../components/tab-nav';

export default class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEditor: this.props.currentEditor,
      editorLanguages: ['html', 'css', 'javascript'],
      theme: 'tomorrow_night'
    };
  }

  componentDidUpdate() {
    if (this.state.currentEditor !== this.props.currentEditor) {
      this.setState({
        currentEditor: this.props.currentEditor
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
              // eslint-disable-next-line no-console
              onChange={this.props.handleEditorValueChange}
              // value={this.props.values[``]}
              name={`${editorLanguage}Editor`}
              width="100%"
              height="calc((100vh) - 65px)"
              className={`${isHidden} editor`}
              key={editorLanguage}
              showGutter={false}
            />
          );
        })}
      </>
    );
  }
}
