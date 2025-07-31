import React from 'react';

const TodoItem = ({ todo, onDelete, onToggle, overdue }) => {
  return (
    <div className="flex justify-between items-center p-3 rounded border border-gray-300 bg-white dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className='size-4 cursor-pointer'
        />
        <div>
         <p className={`${todo.completed ? "line-through text-gray-500" : ""}`}>

            {todo.text}
          </p>
          {todo.dueDate && (
            <p className="text-xs text-gray-400">
              Due: <span className={overdue && !todo.completed ? "text-red-500" : ""}>{todo.dueDate}</span>
            </p>
          )}
        </div>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:underline text-sm"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
