import React from 'react';

export default function OptionsList(props) {
  return (
    <div onClick={props.handleOptionClick} className={`options-list ${props.isOptionsListOpen}`}>
      {props.options.map(optionsListItem => {
        const optionsListId = props.dataType === 'object'
          ? optionsListItem.userId
          : optionsListItem;
        const textContent = props.dataType === 'object'
          ? optionsListItem.username
          : optionsListItem;
        const key = props.dataType === 'object'
          ? optionsListItem.userId
          : optionsListItem;
        return (
          <a key={key}>
            <div className="options-list-item" id={optionsListId}>
              {textContent}
            </div>
          </a>
        );
      })}
    </div>
  );
}
