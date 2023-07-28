// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isDeleting) {
      const deleteTimeout = setTimeout(() => {
        deleteTodo(todo.id);
      }, 3000);

      return () => clearTimeout(deleteTimeout);
    }
  }, [isDeleting, todo.id, deleteTodo]);

  return (
    <li className={`relative flex items-center justify-between px-4 py-2 bg-white shadow ${isDeleting ? 'animate-slideOut' : ''}`}>
      {!todo.completed && (
        <button
          className="w-4 h-4 mr-2 rounded-full border border-gray-400 focus:outline-none"
          onClick={() => toggleTodo(todo.id)}
        />
      )}
      <span
        className={`flex-1 ml-2 ${todo.completed ? 'line-through text-gray-500' : ''}`}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.text}
      </span>
      {isDeleting && <div className="absolute top-0 left-0 w-full h-full bg-red-100 animate-pulse" />}
    </li>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (text) => {
    if (text.trim() === '') return;
    const newTodoItem = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(newTodo);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-400 rounded"
          placeholder="Enter a task and press Enter"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
      </form>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
