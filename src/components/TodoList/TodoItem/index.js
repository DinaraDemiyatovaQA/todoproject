import React, { useState } from 'react';

import { data } from "../../../data";

import Dropdown from '../../common/Dropdown';
import DeleteConfirmation from './DeleteConfirmation/index';

import doneIcon from '../../../img/done.svg';
import editIcon from '../../../img/edit.svg';
import deleteIcon from '../../../img/delete.svg';

import './TodoItem.css';

const TodoItem = props => {

  const categoryOptionsCutNames = Object.keys(data.categoryOptions);
  const priorityOptionsCutNames = Object.keys(data.priorityOptions);
  const categoryOptionsFullNames = Object.values(data.categoryOptions);
  const priorityOptionsFullNames = Object.values(data.priorityOptions);

  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(props.category.charAt(0));
  const [selectedPriority, setSelectedPriority] = useState(props.priority.charAt(0));
  const [beingEdited, setBeingEdited] = useState(false);
  const [deleteConfirmationShown, setDeleteConfirmationShown] = useState(false);

  const showDeleteConfirmationDialog = () => {
    setDeleteConfirmationShown(true);
  }

  const hideDeleteConfirmationDialog = () => {
    setDeleteConfirmationShown(false);
  }

  const selectCategoryChangeHandler = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const selectPriorityChangeHandler = (selectedPriority) => {
    setSelectedPriority(selectedPriority);
  };

  const inputTextChangeHandler = (event) => {
    setInputText(event.target.value);
  };

  const editHandler = () => {
    setInputText(props.text);
    setBeingEdited(true);
  };

  const getValueByFirstLetter = (arrayOfValues, firstLetter) => {
    return arrayOfValues.find(item => item.charAt(0) === firstLetter)
  }

  const onEnter = (event) => {
    if (event.key === "Enter") {
      if (!inputText.trim()) {
        setInputText('');
        return;
      }
      const fullNameSelectedCategory = getValueByFirstLetter(categoryOptionsFullNames, selectedCategory);
      const fullNameSelectedPriority = getValueByFirstLetter(priorityOptionsFullNames, selectedPriority);
      props.onEditTodo({
        id: props.id,
        text: inputText,
        category: fullNameSelectedCategory,
        priority: fullNameSelectedPriority
      });
      setBeingEdited(false);
    }
  }

  const deleteHandler = () => {
    props.onDeleteTodo(props.id);
  };

  const toggleDoneHandler = () => {
    props.onDoneTodo(props.id);
  };

  const isStriked = props.done ? { textDecoration: "line-through" } : {};

  const text = beingEdited ?
    <input
      className='edit-input'
      type="text"
      value={inputText}
      onChange={inputTextChangeHandler} />
    : <span className='todo-item_label'>{props.text}</span>;

  const category = beingEdited ?
    <Dropdown
      label={''}
      options={categoryOptionsCutNames}
      value={selectedCategory}
      onChangeFilter={selectCategoryChangeHandler}
    />
    : selectedCategory ? <button className='todo-item_label'>{selectedCategory}</button> : '';

  const priority = beingEdited ?
    <Dropdown
      label={''}
      options={priorityOptionsCutNames}
      value={selectedPriority}
      onChangeFilter={selectPriorityChangeHandler}
    />
    : <button className='todo-item_label'>{selectedPriority}</button>;


  return (
    <li className='todo-item' style={isStriked}>
      <div className='todo-item_content' onKeyDown={onEnter}>
        {text}
        {category}
        {priority}
      </div>
      {deleteConfirmationShown && <DeleteConfirmation onClose={hideDeleteConfirmationDialog} onConfirm={deleteHandler} />}
      <div className='buttons-container'>
        <button className='edit-button' onClick={editHandler}>
          <img src={editIcon} className="edit" alt="Edit" />
        </button>
        <button className='done-button' onClick={toggleDoneHandler}>
          <img src={doneIcon} className="done" alt="Done" />
        </button>
        <button className='delete-button' onClick={showDeleteConfirmationDialog}>
          <img src={deleteIcon} className="delete" alt="Delete" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
