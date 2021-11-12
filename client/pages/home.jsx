import React, { Component } from 'react';
import MyProjects from './my-projects';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default class Home extends Component {
  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;
    return (
      <MyProjects />
    );
  }
}

Home.contextType = AppContext;
