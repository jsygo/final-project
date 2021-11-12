import React, { Component } from 'react';
import EditorContainer from '../components/editor-container';
import TabNavBar from '../components/tab-nav';
import Modal from '../components/modal';
import OptionsList from '../components/options-list';

import AppContext from '../lib/app-context';

import parseCode from '../lib/parse-code';

const editorLabels = ['HTML', 'CSS', 'JAVASCRIPT'];
const bottomNavButtons = ['RUN', 'PROJECTS', 'SAVE'];
const mobileOutputBottomNavButtons = ['CODE', 'PROJECTS', 'SAVE'];

export default class EditorAndOutput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEditor: 'HTML',
      html: '',
      css: '',
      javascript: '',
      finalOutput: '',
      currentProjectName: '',
      isMobileOutputOpen: false,
      isConfirmSaveOpen: false,
      isProjectOptionsOpen: false,
      isConfirmDeleteOpen: false,
      isUserSearchOpen: false,
      isUserSearchMatchesOpen: false,
      isConfirmShareOpen: false,
      allOtherUsers: [],
      userSearchMatches: [],
      userToShareWith: null
    };

    this.handleEditorLabelsClick = this.handleEditorLabelsClick.bind(this);
    this.handleBottomNavClick = this.handleBottomNavClick.bind(this);
    this.handleEditorValueChange = this.handleEditorValueChange.bind(this);
    this.updateFinalOutput = this.updateFinalOutput.bind(this);
    this.confirmSave = this.confirmSave.bind(this);
    this.closeSave = this.closeSave.bind(this);
    this.toggleProjectOptions = this.toggleProjectOptions.bind(this);
    this.handleProjectOptionClick = this.handleProjectOptionClick.bind(this);
    this.toggleConfirmDelete = this.toggleConfirmDelete.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.toggleUserSearch = this.toggleUserSearch.bind(this);
    this.updateUserSearchMatches = this.updateUserSearchMatches.bind(this);
    this.toggleUserSearchMatches = this.toggleUserSearchMatches.bind(this);
    this.confirmShare = this.confirmShare.bind(this);
    this.toggleConfirmShare = this.toggleConfirmShare.bind(this);
    this.shareProject = this.shareProject.bind(this);
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
      const { userId } = this.context.user;
      const reqBody = {
        html,
        css,
        javascript,
        userId,
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
    } else if (event.target.id === 'PROJECTS') {
      const { html, css, javascript } = this.state;
      const { userId } = this.context.user;
      const reqBody = {
        html,
        css,
        javascript,
        userId,
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
        .then(res => {
          window.location.hash = '#projects';
        })
        .catch(err => console.error(err));
    }
  }

  handleProjectOptionClick(event) {
    if (event.target.id === 'Delete') {
      this.toggleProjectOptions();
      this.toggleConfirmDelete();
    }
    if (event.target.id === 'Share') {
      this.getUsers();
      this.toggleUserSearch();
      this.toggleUserSearchMatches();
    }
  }

  toggleProjectOptions(event) {
    this.setState({
      isProjectOptionsOpen: !this.state.isProjectOptionsOpen
    });
  }

  toggleConfirmDelete() {
    this.setState({
      isConfirmDeleteOpen: !this.state.isConfirmDeleteOpen
    });
  }

  deleteProject() {
    const currentProjectId = this.context.route.params.get('projectId');
    fetch(`/api/delete-project/${currentProjectId}`, { method: 'DELETE' })
      .then(res => {
        window.location.hash = '';
      })
      .catch(err => console.error(err));
  }

  getUsers() {
    const { userId } = this.context.user;
    fetch(`/api/get-other-users/${userId}`, { method: 'GET' })
      .then(res => res.json())
      .then(result => {
        this.toggleProjectOptions();
        this.setState({
          allOtherUsers: result
        });
      })
      .catch(err => console.error(err));
  }

  toggleUserSearch() {
    this.setState({
      isUserSearchOpen: !this.state.isUserSearchOpen
    });
  }

  updateUserSearchMatches(event) {
    const { allOtherUsers } = this.state;
    const search = event.target.value;
    const userSearchMatches = allOtherUsers.filter(user => user.username.toLowerCase().includes(search));
    this.setState({
      userSearchMatches
    });
  }

  toggleUserSearchMatches() {
    this.setState({
      isUserSearchMatchesOpen: !this.state.isUserSearchMatchesOpen
    });
  }

  confirmShare(event) {
    const userToShareWith = event.target.id;
    this.toggleUserSearch();
    this.toggleUserSearchMatches();
    this.toggleConfirmShare();
    this.setState({
      userToShareWith
    });
  }

  toggleConfirmShare() {
    this.setState({
      isConfirmShareOpen: !this.state.isConfirmShareOpen
    });
  }

  shareProject() {
    // const currentProjectId = this.context.route.params.get('projectId');
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
    const isProjectOptionsOpen = this.state.isProjectOptionsOpen
      ? ''
      : 'hidden';
    const isUserSearchMatchesOpen = this.state.isUserSearchMatchesOpen
      ? ''
      : 'hidden';
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
            <div className="tab label">
              <i className="fas fa-cog" onClick={this.toggleProjectOptions}></i>
              {this.state.currentProjectName}
            </div>
            <OptionsList options={['Delete', 'Share']}
              isOptionsListOpen={`${isProjectOptionsOpen} font-one-and-a-half-rem`}
              handleOptionClick={this.handleProjectOptionClick}
              dataType="string"
            />
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
        <Modal isOpen={this.state.isConfirmDeleteOpen}>
          <div className="row pad-10px justify-center">
            <p className="no-margin center-text">Are you sure you want to delete {this.state.currentProjectName}?</p>
          </div>
          <div className="row pad-10px justify-center">
            <div className="col-6 center-text">
              <button
                onClick={this.deleteProject}
                className="red-button">
                Delete
              </button>
            </div>
            <div className="col-6 center-text">
              <button
                className="blue-button"
                onClick={this.toggleConfirmDelete}>
                Cancel
              </button>
            </div>
          </div>
        </Modal>
        <Modal isOpen={this.state.isUserSearchOpen}>
          <div className="row pad-10px justify-center">
            <p className="no-margin center-text">Who would you like to share this project with?</p>
          </div>
          <div className="row pad-10px justify-center position-relative">
            <input
              type="text"
              onChange={this.updateUserSearchMatches}
              placeholder="Search for user...">
            </input>
            <OptionsList options={this.state.userSearchMatches}
              isOptionsListOpen={`${isUserSearchMatchesOpen} font-one-rem no-shadow top-33px`}
              handleOptionClick={this.confirmShare}
              dataType="object"
            />
          </div>
        </Modal>
        <Modal isOpen={this.state.isConfirmShareOpen}>

        </Modal>
      </>
    );
  }
}

EditorAndOutput.contextType = AppContext;
