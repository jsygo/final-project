import React, { Component } from 'react';
import EditorContainer from '../components/editor-container';
import Modal from '../components/modal';

import AppContext from '../lib/app-context';

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
      isConfirmSaveOpen: false,
      currentProjectName: ''
    };

    this.handleEditorLabelsClick = this.handleEditorLabelsClick.bind(this);
    this.handleBottomNavClick = this.handleBottomNavClick.bind(this);
    this.handleEditorValueChange = this.handleEditorValueChange.bind(this);
    this.updateFinalOutput = this.updateFinalOutput.bind(this);
    this.confirmSave = this.confirmSave.bind(this);
    this.closeSave = this.closeSave.bind(this);
  }

  componentDidMount() {
    const currentProjectId = this.context.route.params.get('projectId');
    fetch(`/api/view-project/${Number(currentProjectId)}`, { method: 'GET' })
      .then(res => res.json())
      .then(result => {
        const { name, html, css, javascript } = result;
        this.setState({
          currentProjectName: name,
          html,
          css,
          javascript
        });
      })
      .catch(err => console.error(err));
  }

  handleEditorLabelsClick(event) {
    this.updateFinalOutput();
    this.setState({
      currentEditor: event.target.id
    });
  }

  handleEditorValueChange(value, event) {
    this.setState({
      [this.state.currentEditor.toLowerCase()]: value
    });
  }

  updateFinalOutput() {
    const { html, css, javascript } = this.state;
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
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      };
      const currentProjectId = this.context.route.params.get('projectId');
      fetch(`/api/update-project/${currentProjectId}`, req)
        .then(res => this.confirmSave())
        .catch(err => console.error(err));
    }
  }

  render() {
    const { html, css, javascript } = this.state;
    const editorValues = {
      html,
      css,
      javascript
    };
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
              editorValues={editorValues}
              editorLabels={editorLabels}
              onEditorLabelsClick={this.handleEditorLabelsClick}
              currentEditor={this.state.currentEditor}
              handleEditorValueChange={this.handleEditorValueChange} />
          </div>
          <div className={`col-4 mobile-page ${hideOutput}`}>
            <div className="tab label">{this.state.currentProjectName}</div>
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

EditorAndOutput.contextType = AppContext;
