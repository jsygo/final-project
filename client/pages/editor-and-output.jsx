import React, { Component } from 'react';
import EditorContainer from '../components/editor-container';

import TabNavBar from '../components/tab-nav';

import parseCode from '../lib/parse-code';

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
    const isMobileOutputOpen = this.state.isMobileOutputOpen
      ? 'hide-on-desktop'
      : 'hide-on-desktop mobile-output-not-open';
    let hideEditor = '';
    let hideOutput = '';
    this.state.isMobileOutputOpen
      ? hideEditor = 'hide-on-mobile'
      : hideOutput = 'hide-on-mobile';
    return (
      <>
        <div className="container row">
          <div className={`col-8 mobile-page ${hideEditor}`}>
            <EditorContainer
              editorLabels={editorLabels}
              onEditorLabelsClick={this.handleEditorLabelsClick}
              currentEditor={this.state.currentEditor}
              handleEditorValueChange={this.handleEditorValueChange}/>
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
    );
  }
}
