import React, { Component } from 'react';
import Modal from '../components/modal';

export default class ProjectsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentList: this.props.currentList
    };
  }

  render() {
    return (
      <MyProjects onProjectNameInput={this.props.onProjectNameInput} />
    );
  }
}

class MyProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.requireProjectName = this.requireProjectName.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  requireProjectName(event) {
    if (!this.props.onProjectNameInput.currentProject) {
      event.preventDefault();
    }
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

          </ul>
        </div>
        <Modal isOpen={this.state.isModalOpen}>
          <div className="row pad-10px justify-center">
            <p className="no-margin">New Project</p>
          </div>
          <div className="row pad-10px justify-center">
            <input
              type="text"
              placeholder="Enter project name..."
              value={this.props.onProjectNameInput.currentProject}
              onChange={this.props.onProjectNameInput.handleProjectNameInput}></input>
          </div>
          <div className="row pad-10px justify-center">
            <div className="col-6 center-text">
              <a
                onClick={this.requireProjectName}
                href="#editor-and-output">
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
