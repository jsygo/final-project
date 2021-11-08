import React, { Component } from 'react';
import EditorContainer from '../components/editor-container';
import Modal from '../components/modal';

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
      isMobileOutputOpen: false,
      isConfirmSaveOpen: false
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
    this.confirmSave = this.confirmSave.bind(this);
    this.closeSave = this.closeSave.bind(this);
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
      html,
      css,
      javascript,
      finalOutput,
      isMobileOutputOpen: true
    });
  }

  confirmSave() {
    this.setState({
      isConfirmSaveOpen: true
    });
  }

  closeSave(event) {
    this.setState({
      isConfirmSaveOpen: false
    });
  }

  handleBottomNavClick(event) {
    if (event.target.id === 'RUN') {
      this.updateFinalOutput();
    } else if (event.target.id === 'CODE') {
      this.setState({
        isMobileOutputOpen: false
      });
    } else if (event.target.id === 'SAVE') {
      const { html, css, javascript } = this.state;
      const reqBody = {
        html,
        css,
        javascript,
        projectName: this.props.currentProject
      };
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      };
      fetch('/api/save-project', req)
        .then(res => this.confirmSave())
        // eslint-disable-next-line no-console
        .catch(err => console.err(err));
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
        <Modal isOpen={this.state.isConfirmSaveOpen}>
          <div className="row pad-10px justify-center">
            <p className="no-margin">Project Saved!</p>
          </div>
          <div className="row pad-10px justify-center">
            <button
              onClick={this.closeSave}
              className="blue-button">
                Close
            </button>
          </div>
        </Modal>
      </>
    );
  }
}
