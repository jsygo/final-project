import React, { Component } from 'react';
import EditorContainer from '../components/editor-container';

import TabNavBar from '../components/tab-nav';

// import parseCode from '../lib/parse-code';

const editorLabels = ['HTML', 'CSS', 'JAVASCRIPT'];
const bottomNavButtons = ['RUN', 'PROJECTS', 'SAVE'];

export default class EditorAndOutput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: '',
      css: '',
      javascript: '',
      finalOutput: '',
      currentEditor: 'CSS'
    };

    this.handleEditorLabelsClick = this.handleEditorLabelsClick.bind(this);
    this.handleBottomNavClick = this.handleBottomNavClick.bind(this);
  }

  handleEditorLabelsClick(event) {
    this.setState({
      currentEditor: event.target.id
    });
  }

  handleBottomNavClick(event) {
    // eslint-disable-next-line no-console
    console.log(event.target);
  }

  render() {
    return (
      <>
        <div className="container row">
          <div className="col-8">
            <EditorContainer
              editorLabels={editorLabels}
              onEditorLabelsClick={this.handleEditorLabelsClick}
              currentEditor={this.state.currentEditor}/>
          </div>
          <div className="col-4">
            <div className="tab">Project Name</div>
            <iframe srcDoc={this.state.finalOutput} className="output"></iframe>
          </div>
        </div>
        <TabNavBar
          buttons={bottomNavButtons}
          position="fixed-bottom"
          onClick={this.handleBottomNavClick}
        />
      </>
    );
  }
}
