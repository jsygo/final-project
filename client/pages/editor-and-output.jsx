import React, { Component } from 'react';
import EditorContainer from '../components/editor-container';

import TabNavBar from '../components/tab-nav';

import EditorContext from '../lib/editor-context';

import parseCode from '../lib/parse-code';

// import parseCode from '../lib/parse-code';

const editorLabels = ['HTML', 'CSS', 'JAVASCRIPT'];
const bottomNavButtons = ['RUN', 'PROJECTS', 'SAVE'];
const mobileOutputBottomNavButtons = ['CODE', 'PROJECTS', 'SAVE'];

export default class EditorAndOutput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: '',
      css: '',
      javascript: '',
      finalOutput: '',
      currentEditor: 'HTML',
      isMobileOutputOpen: false
    };

    this.editorValues = {
      html: '',
      css: '',
      javascript: ''
    };

    // this.currentEditorValue = {
    //   editorId: '',
    //   value: ''
    // };

    this.handleEditorLabelsClick = this.handleEditorLabelsClick.bind(this);
    this.handleBottomNavClick = this.handleBottomNavClick.bind(this);
    this.handleEditorValueChange = this.handleEditorValueChange.bind(this);
    this.updateFinalOutput = this.updateFinalOutput.bind(this);
  }

  handleEditorLabelsClick(event) {
    this.updateFinalOutput();
    this.setState({
      currentEditor: event.target.id
    });
  }

  handleEditorValueChange(value, event) {
    this.editorValues[this.state.currentEditor.toLowerCase()] = value;
  }

  // updateEditorValueInState() {
  //   this.setState({
  //     [this.currentEditorValue.editorId]: this.currentEditorValue.value
  //   });
  // }

  updateFinalOutput() {
    const { html, css, javascript } = this.editorValues;
    const finalOutput = parseCode(html, css, javascript);
    this.setState({
      finalOutput,
      isMobileOutputOpen: true
    });
  }

  handleBottomNavClick(event) {
    if (event.target.id === 'RUN') {
      this.updateFinalOutput();
    } else if (event.target.id === 'CODE') {
      this.setState({
        isMobileOutputOpen: false
      });
    }
  }

  render() {
    const { handleEditorValueChange } = this;
    const contextValue = { handleEditorValueChange };
    const isMobileOutputOpen = this.state.isMobileOutputOpen
      ? 'hide-on-desktop'
      : 'hide-on-desktop mobile-output-not-open';
    let hideEditor = '';
    let hideOutput = '';
    this.state.isMobileOutputOpen
      ? hideEditor = 'hide-on-mobile'
      : hideOutput = 'hide-on-mobile';
    return (
      <EditorContext.Provider value={contextValue}>
        <>
          <div className="container row">
            <div className={`col-8 mobile-page ${hideEditor}`}>
              <EditorContainer
                editorLabels={editorLabels}
                onEditorLabelsClick={this.handleEditorLabelsClick}
                currentEditor={this.state.currentEditor}/>
            </div>
            <div className={`col-4 mobile-page ${hideOutput}`}>
              <div className="tab label">{this.props.currentProject}</div>
              <iframe srcDoc={this.state.finalOutput} className="output"></iframe>
            </div>
          </div>
          <TabNavBar
            buttons={bottomNavButtons}
            position="fixed-bottom"
            onClick={this.handleBottomNavClick}
          />
          <TabNavBar
            isMobileOutputOpen={isMobileOutputOpen}
            buttons={mobileOutputBottomNavButtons}
            position="fixed-bottom"
            onClick={this.handleBottomNavClick}
          />
        </>
      </EditorContext.Provider>
    );
  }
}
