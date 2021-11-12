import React from 'react';
import Home from './pages/home';
import Auth from './pages/auth';
import EditorAndOutput from './pages/editor-and-output';
import Projects from './pages/projects';
import NotFound from './pages/not-found';
import AppContext from './lib/app-context';

import parseRoute from './lib/parse-route';
import decodeToken from './lib/decode-token';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      user: null,
      isAuthorizing: true
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = localStorage.getItem('webbin-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({
      user,
      isAuthorizing: false
    });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('webbin-jwt', token);
    this.setState({
      user
    });
  }

  handleSignOut() {
    window.localStorage.removeItem('webbin-jwt');
    this.setState({
      user: null
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
    if (path === 'sign-in') {
      return <Auth />;
    }
    if (path === 'editor-and-output') {
      return <EditorAndOutput/>;
    }
    if (path === 'projects') {
      return <Projects />;
    }
    return <NotFound />;
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue} >
        <>
          { this.renderPage() }
        </>
      </AppContext.Provider>
    );
  }
}
