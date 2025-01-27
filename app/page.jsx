'use client'
import React, { useState, useEffect } from 'react'

const HomePage = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Handle adding a new todo
  const handleAddTodos = (e) => {
    e.preventDefault();

    if (input.trim() !== '') {
      const newTodo = {id: Date.now(), text: input, checked: false };
      // Store each todo as an object with 'text' and 'checked' properties
      setTodos([...todos, newTodo]); // Add new todo to the list
      setInput(''); // Clear input field
    }
  }

  // Handle checking/unchecking a todo
  const handleCheckboxChange = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(updatedTodos);
  }

  const handleRemoveTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  }

  const sortedTodos = todos.sort((a, b) => a.checked - b.checked);

  return (
    <div>
      <h1 className='text-7xl text-center mt-20'>To List</h1>
      <form onSubmit={handleAddTodos}>
        <input
          type='text'
          className='block w-1/3 m-auto mt-10 p-2 rounded-lg shadow-lg text-black'
          placeholder='Add Todo'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <div className='bg-white w-1/3 mx-auto mt-10 p-5 rounded-lg shadow-lg'>
        <ul className='text-black'>
          {sortedTodos.map((todo, index) => (
            <li key={index} className='border-b-2 border-gray-200 p-2'>
              <input
                  type="checkbox"
                  className="mr-5 appearance-none border-2 border-gray-400 rounded-md w-6 h-6 
                            checked:bg-gray-800 checked:border-transparent 
                            checked:before:content-['✔'] checked:before:text-white 
                            before:block before:w-full before:h-full before:text-center 
                            focus:ring-0"
                  checked={todo.checked}
                  onChange={() => handleCheckboxChange(index)}
                />
              <span className={todo.checked ? 'line-through' : ''}>{todo.text}</span>
              <button
                  className="ml-5 text-red-500 float-right"
                  onClick={() => handleRemoveTodo(todo.id)}
                >
                  X
                </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
