import React, { Component } from 'react';

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen
    };
  }

  componentDidUpdate() {
    if (this.props.isOpen !== this.state.isOpen) {
      this.setState({
        isOpen: this.props.isOpen
      });
    }
  }

  render() {
    if (!this.state.isOpen) {
      return null;
    }
    return (
        <>
          <div className="modal-overlay">
            <div className="modal font-one-and-a-half-rem line-height-one-and-a-half-rem">
              {this.props.children}
            </div>
          </div>
        </>
    );
  }
}
