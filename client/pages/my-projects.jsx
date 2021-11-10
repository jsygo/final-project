import React, { Component } from 'react';
import Modal from '../components/modal';

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
    fetch('/api/view-my-projects', { method: 'GET' })
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
    if (!this.state.currentProjectName) {
      event.preventDefault();
      return;
    }
    const reqBody = {
      html: '',
      css: '',
      javascript: '',
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
    return (
      <>
        <div className="tab label">My Projects</div>
        <div className="center-text">
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
              <a
                onClick={this.createProject}>
                  <button
                    className="green-button">
                      Create
                  </button>
              </a>
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
