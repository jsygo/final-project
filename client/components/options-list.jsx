import React from 'react';

export default function OptionsList(props) {
  return (
    <div onClick={props.handleOptionClick} className={`options-list ${props.isOptionsListOpen}`}>
      {props.options.map(optionsListItem => {
        return (
          <a key={optionsListItem}>
            <div className="options-list-item" id={optionsListItem}>
              {optionsListItem}
            </div>
          </a>
        );
      })}
    </div>
  );
}
