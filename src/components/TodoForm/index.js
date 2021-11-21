import './TodoForm.css';
import React, { useState } from 'react';

import { data } from "../../data";

import Dropdown from '../common/Dropdown';

function TodoForm(props) {

    const categoryOptions = Object.values(data.categoryOptions);
    const categoryLabel = data.categoryLabelWhenCreating;

    const priorityOptions = Object.values(data.priorityOptions);
    const priorityLabel = data.priorityLabelWhenCreating;

    const [inputText, setInputText] = useState('');
    const [newTodoCategory, setNewTodoCategory] = useState(categoryOptions[1]);
    const [newTodoPriority, setNewTodoPriority] = useState(priorityOptions[1]);

    const inputTextChangeHandler = (event) => {
        setInputText(event.target.value);
    };

    const newTodoCategoryChangeHandler = (selectedCategory) => {
        setNewTodoCategory(selectedCategory);
    };

    const newTodoPriorityChangeHandler = (selectedPriority) => {
        setNewTodoPriority(selectedPriority);
    };

    const addNewTodo = () => {
        const newItem = {
            text: inputText,
            done: false,
            category: newTodoCategory,
            priority: newTodoPriority,
            id: new Date().getTime(),
            date: new Date().getTime()
        }
        props.onAddTodo(newItem);
    };

    const formSubmitHandler = event => {
        event.preventDefault();
        addNewTodo();
        setInputText('');
    };

    return (
        <form id="todo-form" onSubmit={formSubmitHandler}>
            <div className='form-control'>
                <label htmlFor="todo">Enter ToDo</label>
                <input
                    type="text"
                    value={inputText}
                    onChange={inputTextChangeHandler}
                    required />
            </div>
            <Dropdown
                value={newTodoCategory}
                label={categoryLabel}
                options={categoryOptions}
                onChangeFilter={newTodoCategoryChangeHandler} />
            <Dropdown
                value={newTodoPriority}
                label={priorityLabel}
                options={priorityOptions}
                onChangeFilter={newTodoPriorityChangeHandler} />
            <button type="submit">Add Todooo !!!</button>
        </form>
    );
}

export default TodoForm;