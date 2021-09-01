import React, { useEffect } from 'react';

import AddButton from './components/addButton';
import ToDoList from './components/toDoList';

import './App.css';

function App() {
  const [toDoList, setToDoList] = React.useState([]);
  const [newAdded, setNewAdded] = React.useState([]);

  const dataStructure = { title: 'New TODO ', subs: [], open: false };

  useEffect(() => {
    const list = localStorage.getItem('doList');
    if (list) setToDoList(JSON.parse(list));
  }, []);

  const saveOnLocal = (data) => {
    localStorage.removeItem('doList');
    localStorage.setItem('doList', JSON.stringify(data));
  };
  const onChange = (e) => {
    const indexes = e.target.name.split('-');

    const changeList = [...toDoList];
    if (indexes.length > 2) {
      changeList[Number(indexes[1])].subs[Number(indexes[2])].title = e.target.value;
    } else {
      changeList[Number(indexes[1])].title = e.target.value;
    }
    saveOnLocal(changeList);
    setToDoList(changeList);
  };

  const addToDo = () => {
    const changeList = [...toDoList];
    changeList.push(dataStructure);
    setNewAdded([changeList.length]);
    saveOnLocal(changeList);
    setToDoList(changeList);
  };

  const addSubToDo = (index) => {
    const changeList = [...toDoList];
    changeList[index].open = true;
    changeList[index].subs.push(dataStructure);
    setNewAdded([index, changeList[index].subs.length]);
    saveOnLocal(changeList);
    setToDoList(changeList);
  };

  const onDelete = (index, subIndex) => {
    const changeList = [...toDoList];
    if (index && subIndex) {
      changeList[index - 1].subs.splice(subIndex - 1, 1);
    } else {
      changeList.splice(index - 1, 1);
    }
    saveOnLocal(changeList);
    setToDoList(changeList);
  };

  return (
    <div className='to-do'>
      <ToDoList
        toDoList={toDoList}
        onDelete={onDelete}
        addSubToDo={addSubToDo}
        onChange={onChange}
        newAdded={newAdded}
      />
      <AddButton onClick={addToDo} />
    </div>
  );
}

export default App;
