import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { Search } from "lucide-react";

function App() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const addTodo = () => {
    if (text.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text,
      dueDate,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setText("");
    setDueDate("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const remainingCount = todos.filter((todo) => !todo.completed).length;

  const isOverdue = (date) => {
    return date && new Date(date) < new Date() && !isNaN(new Date(date));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      {/* Content Area */}
      <div className="flex-grow flex flex-col items-center p-6">
        <div className="flex justify-end w-full">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mb-4 w-fit px-2 py-1 rounded bg-gray-800 text-white dark:bg-white dark:text-black"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <h1 className="text-3xl font-playwrite font-light mb-6">To-Do List</h1>

        <div className="flex flex-col sm:flex-row items-center gap-1 mb-4">
        <label className="font-playwrite font-light text-1xl">Task name :</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 w-64 dark:bg-gray-700 dark:text-white hover:border-2 hover:border-blue-400 transition-all delay-60"
            placeholder="Enter a task to add"
          />
          <label className="md:ml-3 font-playwrite font-light text-1xl">Date :</label>
          <input
            type="date"
            value={dueDate}
            
            onChange={(e) => setDueDate(e.target.value)}
            className="px-3 py-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white hover:border-2 hover:border-blue-400 transition-all delay-60"
          />
          <button
            onClick={addTodo}
            className="bg-green-500 text-white px-4 py-2 rounded font-playwrite font-light text-1xl hover:bg-blue-500 "
          >
            Add
          </button>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-md relative mb-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white focus:outline-none"
          />
        </div>

        {/* Task Count and Clear Button moved here */}
        <div className="mb-4 flex justify-between items-center w-full max-w-md text-sm text-gray-600 dark:text-gray-400">
          <span>
            {remainingCount} task{remainingCount !== 1 ? "s" : ""} remaining
          </span>
          <button
            onClick={clearCompleted}
            className="text-red-500 hover:underline"
          >
            Clear Completed
          </button>
        </div>

        {/* Task List */}
        <div className="w-full max-w-md space-y-2">
          {todos
            .filter((todo) =>
              todo.text.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={deleteTodo}
                onToggle={toggleTodo}
                overdue={isOverdue(todo.dueDate)}
              />
            ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <hr className="mb-3 border-gray-300 dark:border-gray-600" />
        <p>
          📝 This is a simple To-Do List app built with React and Tailwind CSS.
          It supports dark mode, local storage, due dates, and task filtering.
        </p>
        <p>contact : vigneshv1517@gamil.com</p>
        <p className="mt-1">
          © 2025 <span className="text-sky-400">V.VIGNESHWARAN</span>. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
