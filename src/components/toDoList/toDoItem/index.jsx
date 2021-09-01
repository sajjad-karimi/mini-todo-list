import React from 'react';

import './ToDoItem.css';

const ToDoItem = ({ value, name, onChange, onEnter, onDelete, autoFocus }) => {
  const keyPress = (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'Delete') {
      e.preventDefault();
      onDelete();
    }
    if (e.key === 'Enter') {
      onEnter();
    }
  };

  const feature = () => {
    alert('Can add new feature in future.🔥');
  };

  return (
    <div className='to-do-list'>
      <span className='dot' onClick={feature}></span>
      <input
        autoFocus={autoFocus}
        value={value}
        name={name}
        onChange={onChange}
        onKeyDown={keyPress}
      />
    </div>
  );
};

export default ToDoItem;
