import React, { useState } from 'react';

import { data } from "../../data";

import TodoItem from './TodoItem';
import Dropdown from '../common/Dropdown';

import './TodoList.css';

const TodoList = ({ todos, deleteTodo, toggleDoneStatusOfTodo, editTodo }) => {

  const categoryOptions = Object.values(data.categoryOptions);
  const categoryLabel = data.categoryLabelWhenFiltering;
  const priorityOptions = Object.values(data.priorityOptions);

  const [sortingMode, setSortingMode] = useState('Date');
  const [filteredByCategory, setFilteredByCategory] = useState('');

  const filteredByCategoryChangeHandler = (selectedCategory) => {
    setFilteredByCategory(selectedCategory);
  };

  const sortingClickHandler = () => {
    const mode = sortingMode === 'Date' ?
      'Priority' : 'Date';
    setSortingMode(mode);
  };

  const filteredTodos = todos.filter((item) => {
    if (filteredByCategory === '') {
      return todos;
    }
    return item.category === filteredByCategory;
  });

  const sortingButtonName = sortingMode === 'Date' ?
    'Sorting by Date of creation'
    : 'Sorting by Priority';

  const sortByDate = arrayToSort => {
    return arrayToSort.sort((a, b) => b.date - a.date)
  }

  const sortByPriority = arrayToSort => {
    const map = new Map();
    priorityOptions.forEach((x, i) => map.set(x, i));
    return arrayToSort.sort((x, y) => map.get(x.priority) - map.get(y.priority));
  }

  const sortedTodos = sortingMode === 'Date' ?
    sortByDate(filteredTodos)
    : sortByPriority(filteredTodos);

  const noTodosText = 'You have nothing to do ;-) Sooo... you should rest!';

  const todosListContent = filteredTodos.length ?
    <ul className="todo-list">
      {sortedTodos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          category={todo.category}
          priority={todo.priority}
          done={todo.done}
          onEditTodo={editTodo}
          onDeleteTodo={deleteTodo}
          onDoneTodo={toggleDoneStatusOfTodo} >
        </TodoItem>
      ))}
    </ul>
    : <h2 className='default-text'>{noTodosText}</h2>;

  return (
    <div id="todos">
      <Dropdown
        label={categoryLabel}
        options={categoryOptions}
        value={filteredByCategory}
        onChangeFilter={filteredByCategoryChangeHandler}
      />
      <button onClick={sortingClickHandler}>{sortingButtonName}</button>
      {todosListContent}
    </div>
  );
}

export default TodoList;
