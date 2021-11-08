import React, { Component } from 'react';

export default class TabNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: this.props.currentTab,
      isMobileOutputOpen: this.props.isMobileOutputOpen
    };
  }

  componentDidUpdate() {
    if (this.state.currentTab !== this.props.currentTab ||
      this.state.isMobileOutputOpen !== this.props.isMobileOutputOpen) {
      this.setState({
        currentTab: this.props.currentTab,
        isMobileOutputOpen: this.props.isMobileOutputOpen
      });
    }
  }

  render() {
    return (
      <div className={`${this.props.position} ${this.state.isMobileOutputOpen} tab-navbar`}>
        {this.props.buttons.map(button => {
          const isCurrentTab = button === this.state.currentTab
            ? 'bold'
            : '';
          return (
            <a
              key={button} className="tab-wrap"
            >
              <div
                className={`${isCurrentTab} tab`}
                id={button}
                onClick={this.props.onClick}>
                {button}
              </div>
            </a>
          );
        })}
      </div>
    );
  }
}
