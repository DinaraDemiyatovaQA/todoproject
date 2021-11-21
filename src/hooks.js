import { useState } from "react";

function useLocalStorage(key, initialValue) {

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = (id) => {
    try {
      const valueToStore = storedValue.filter(item => item.id !== id);
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDoneStatusOfItem = (id) => {
    try {
      const valueToStore = storedValue.map(item => {
        return item.id === id ? { ...item, done: !item.done } : { ...item };
      });
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  const editItem = (id, updatedText, updatedCategory, updatedPriority) => {
    try {
      const valueToStore = storedValue.map(todo => {
        return todo.id === id ? {
          ...todo,
          text: updatedText,
          category: updatedCategory,
          priority: updatedPriority
        }
          : { ...todo };
      });
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue, deleteItem, toggleDoneStatusOfItem, editItem];
}

export default useLocalStorage;