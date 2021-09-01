import React from 'react';
import ToDoItem from './toDoItem';

import './ToDoList.css';

const ToDoList = ({ toDoList, onChange, onDelete, newAdded, addSubToDo }) => {
  return (
    <ul>
      {toDoList.map((todo, index) => {
        return (
          <li key={`main-todo-${index}`}>
            <ToDoItem
              autoFocus={newAdded[1] ? false : newAdded[0] - 1 === index}
              value={todo.title}
              name={`item-${index}`}
              onChange={onChange}
              onDelete={() => onDelete(index + 1)}
              onEnter={() => addSubToDo(index)}
            />
            {todo.subs.length > 0 && todo.open && (
              <ul className='sub-list'>
                {todo.subs.map((subTodo, subIndex) => {
                  return (
                    <li key={`sub-todo-${index}-${subIndex}`}>
                      <ToDoItem
                        autoFocus={
                          newAdded[1]
                            ? newAdded[0] === index && newAdded[1] - 1 === subIndex
                            : false
                        }
                        value={subTodo.title}
                        name={`item-${index}-${subIndex}`}
                        onDelete={() => onDelete(index + 1, subIndex + 1)}
                        onChange={onChange}
                        onEnter={() => addSubToDo(index)}
                      />
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default ToDoList;
