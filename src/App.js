import './App.css';
import { useState, useEffect } from "react";

import TodoList from './components/TodoList/index';
import TodoForm from './components/TodoForm/index';

function App() {

  const apiPath = '/api/todo';

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(apiPath)
      .then((res) => res.json())
      .then((json) => setTodos(json.todos))
      .catch((err) => console.log(err))
  }, [])

  const createTodo = async (newItem) => {
    try {
      const res = await fetch(apiPath, {
        method: 'POST',
        body: JSON.stringify({
          id: newItem.id,
          text: newItem.text,
          done: newItem.done,
          category: newItem.category,
          priority: newItem.priority,
          date: newItem.date
        }),
      })
      const json = await res.json()

      setTodos([...todos, json.todo])
    } catch (err) {
      console.log(err)
    }
  }

  const editTodo = async (editedTodo) => {
    try {
      const res = await fetch(`${apiPath}/${editedTodo.id}`, {
        method: 'PATCH',
        body: JSON.stringify(editedTodo),
      })
      const json = await res.json()
      const todosCopy = [...todos]
      const index = todos.findIndex((todo) => todo.id === editedTodo.id)
      todosCopy[index] = json.todo
      setTodos(todosCopy)
    } catch (err) {
      console.log(err)
    }
  }

  const toggleDoneStatusOfTodo = async (id) => {
    const currentDoneStatus = todos.find(item => {
      return item.id === id ? item : false;
    }).done;

    try {
      const res = await fetch(`${apiPath}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ done: !currentDoneStatus }),
      })
      const json = await res.json()
      const todosCopy = [...todos]
      const index = todos.findIndex((todo) => todo.id === id)
      todosCopy[index] = json.todo
      setTodos(todosCopy)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await fetch(`${apiPath}/${id}`, { method: 'DELETE' })
      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="App">
      <TodoForm onAddTodo={createTodo} />
      <TodoList id="todos"
        todos={todos}
        deleteTodo={deleteTodo}
        toggleDoneStatusOfTodo={toggleDoneStatusOfTodo}
        editTodo={editTodo}
      />
    </div>
  );
}

export default App;
