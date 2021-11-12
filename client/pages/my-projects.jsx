import React, { Component } from 'react';
import Modal from '../components/modal';
import AppContext from '../lib/app-context';

export default class MyProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNewProjectModalOpen: false,
      myProjectsList: [],
      currentProjectName: ''
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.createProject = this.createProject.bind(this);
    this.handleProjectNameInput = this.handleProjectNameInput.bind(this);
  }

  componentDidMount() {
    const { userId } = this.context.user;
    fetch(`/api/view-my-projects/${userId}`, { method: 'GET' })
      .then(res => res.json())
      .then(result => {
        this.setState({
          myProjectsList: result
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  toggleModal() {
    this.setState({
      isNewProjectModalOpen: !this.state.isNewProjectModalOpen
    });
  }

  handleProjectNameInput(event) {
    this.setState({
      currentProjectName: event.target.value
    });
  }

  createProject(event) {
    const { userId } = this.context.user;
    if (!this.state.currentProjectName) {
      event.preventDefault();
      return;
    }
    const reqBody = {
      html: '',
      css: '',
      javascript: '',
      userId,
      projectName: this.state.currentProjectName
    };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    };
    fetch('/api/save-project', req)
      .then(res => res.json())
      .then(result => {
        window.location.hash = `#editor-and-output?projectId=${result.projectId}`;
      })
      .catch(err => console.error(err));
  }

  render() {
    const { handleSignOut } = this.context;
    return (
      <>
        <div className="tab label">
          <a className="sign-out" href="#" onClick={handleSignOut}><p>Sign Out</p></a>
          My Projects
        </div>
        <div className="center-text col-2 offset-5">
          <a
            onClick={this.toggleModal}>
              <p className="font-one-and-a-half-rem gray-text">
                + New Project
              </p>
          </a>
          <ul>
            {this.state.myProjectsList.map(project => {
              return (
                <a
                  href={`#editor-and-output?projectId=${project.projectId}`}
                  key={project.projectId}>
                  <li
                    id={project.projectId}
                    className="font-one-and-a-half-rem pad-10px">
                      {project.name}
                  </li>
                  <p className="subtitle left-text">{project.username}</p>
                </a>
              );
            })}
          </ul>
        </div>
        <Modal isOpen={this.state.isNewProjectModalOpen}>
          <div className="row pad-10px justify-center">
            <p className="no-margin">New Project</p>
          </div>
          <div className="row pad-10px justify-center">
            <input
              type="text"
              placeholder="Enter project name..."
              value={this.currentProjectName}
              onChange={this.handleProjectNameInput}></input>
          </div>
          <div className="row pad-10px justify-center">
            <div className="col-6 center-text">
                <button
                  onClick={this.createProject}
                  className="green-button">
                    Create
                </button>
            </div>
            <div className="col-6 center-text">
              <button
                className="blue-button"
                onClick={this.toggleModal}>
                  Cancel
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

MyProjects.contextType = AppContext;
