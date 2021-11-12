import React, { Component } from 'react';
import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

export default class AuthPage extends Component {
  render() {
    const { user, handleSignIn } = this.context;
    if (user) {
      return <Redirect to="" />;
    }
    return (
      <>
        <div className="tab label">
          Sign In
        </div>
        <div className="center-content full-height">
          <AuthForm onSignIn={handleSignIn} />
        </div>
      </>
    );
  }
}

AuthPage.contextType = AppContext;
