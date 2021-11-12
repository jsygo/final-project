import React, { Component } from 'react';

export default class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/auth/sign-in', req)
      .then(res => res.json())
      .then(result => this.props.onSignIn(result))
      .catch(err => console.error(err));
  }

  render() {
    const { handleChange, handleSubmit } = this;

    return (
      <form onSubmit={handleSubmit} className="auth-form pad-10px font-one-and-a-half-rem">
        <div className="row pad-10px">
          <label htmlFor="username">
            Username
          </label>
          <input
            className="col-12"
            required
            autoFocus
            id="username"
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Enter username..."
          />
        </div>
        <div className="row pad-10px">
          <label htmlFor="password">
            Password
          </label>
          <input
            className="col-12"
            required
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter password..."
          />
        </div>
        <div className="row center-content pad-10px">
          <button className="green-button">
            Sign In
          </button>
        </div>
      </form>
    );
  }
}
