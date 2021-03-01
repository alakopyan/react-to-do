import React from "react";

export default function Todo({
  id,
  name,
  deleteTask,
  toggleTaskCompleted,
  completed,
}) {
  return (
    <li className="toDoItem">
      <div className="toDoItemWrapper">
        <input
          className="checkboxItem"
          id={`todo-${id}`}
          type="checkbox"
          checked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label
          className="todoLabel"
          htmlFor={`todo-${id}`}
          style={{
            textDecoration: completed ? "line-through" : "initial",
            opacity: completed ? 0.5 : "initial",
          }}
        >
          {name}
        </label>
      </div>
      <button
        type="button"
        className="btn btnDanger"
        onClick={() => deleteTask(id)}
      >
      x
      </button>
    </li>
  );
}
