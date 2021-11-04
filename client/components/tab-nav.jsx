import React, { Component } from 'react';

export default class TabNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentTab:
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {

  }

  render() {
    return (
      <div className={`${this.props.position} tab-navbar`}>
        {this.props.buttons.map(button =>
          <a onClick={this.handleClick} href={`#${button}`} key={button} className="tab-wrap">
            <div className="tab">
              {button}
            </div>
          </a>
        )}
      </div>
    );
  }
}
