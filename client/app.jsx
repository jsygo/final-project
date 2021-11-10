import React from 'react';
import Home from './pages/home';
import EditorAndOutput from './pages/editor-and-output';
import NotFound from './pages/not-found';
import AppContext from './lib/app-context';

import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
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
      return <EditorAndOutput/>;
    }
    return <NotFound />;
  }

  render() {
    return (
      <AppContext.Provider value={{ route: this.state.route }} >
        <>
          { this.renderPage() }
        </>
      </AppContext.Provider>
    );
  }
}
