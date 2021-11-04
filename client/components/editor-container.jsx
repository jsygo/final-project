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
      currentEditor: 'HTML',
      editorLanguages: ['html', 'css', 'javascript'],
      theme: 'tomorrow_night'
    };
  }

  render() {
    return (
      <>
        <TabNavBar buttons={this.props.editorLabels} />
        {this.state.editorLanguages.map(editorLanguage => {
          const isHidden = this.state.currentEditor.toLowerCase() === editorLanguage
            ? ''
            : 'hidden';
          return (
            <AceEditor
              mode={editorLanguage}
              theme={this.state.theme}
              // eslint-disable-next-line no-console
              onChange={(value, event) => console.log(value, event)}
              // value={this.props.values[``]}
              name={`${editorLanguage}Editor`}
              width="100%"
              height="calc((100vh) - 65px)"
              className={`${isHidden} editor`}
              key={editorLanguage}
              showGutter={false}
            />
          );
        })
        /* <AceEditor
          mode="html"
          theme="tomorrow_night"
          onChange={(value, event) => console.log(value, event)}
          name="htmlEditor"
          width="100%"
          height="100vh"
          className={
          }
        />
        <AceEditor
          mode="css"
          theme="tomorrow_night"
          onChange={(value, event) => console.log(value, event)}
          name="cssEditor"
          width="100%"
          className="hidden"
        />
        <AceEditor
          mode="javascript"
          theme="tomorrow_night"
          onChange={(value, event) => console.log(value, event)}
          name="javascriptEditor"
          width="100%"
          className="hidden"
        /> */}
      </>
    );
  }
}
