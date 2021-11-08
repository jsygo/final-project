import React from 'react';
import Home from './pages/home';
import EditorAndOutput from './pages/editor-and-output';
import NotFound from './pages/not-found';

import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProject: '',
      route: parseRoute(window.location.hash)
    };

    this.handleProjectNameInput = this.handleProjectNameInput.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  handleProjectNameInput(event) {
    this.setState({
      currentProject: event.target.value
    });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return (
        <Home
          currentProject={this.state.currentProject}
          onProjectNameInput={{
            handleProjectNameInput: this.handleProjectNameInput,
            currentProject: this.state.currentProject
          }} />
      );
    }
    if (path === 'editor-and-output') {
      return <EditorAndOutput currentProject={this.state.currentProject} />;
    }
    return <NotFound />;
  }

  render() {
    return (
      <>
        { this.renderPage() }
      </>
    );
  }
}
