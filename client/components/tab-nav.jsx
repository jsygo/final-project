import React, { Component } from 'react';

export default class TabNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: this.props.currentTab
    };
  }

  componentDidUpdate() {
    if (this.state.currentTab !== this.props.currentTab) {
      this.setState({
        currentTab: this.props.currentTab
      });
    }
  }

  render() {
    return (
      <div className={`${this.props.position} tab-navbar`}>
        {this.props.buttons.map(button => {
          const isCurrentTab = button === this.state.currentTab
            ? 'bold'
            : '';
          return (
            <a
              // href={`#${button}`}
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
