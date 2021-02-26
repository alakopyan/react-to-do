import React from "react";

export default function Todo({
  id,
  name,
  deleteTask,
  toggleTaskCompleted,
  completed,
}) {
  return (
    <li className="todoItem">
      <div>
        <input
          id={`todo-${id}`}
          type="checkbox"
          checked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label
          className="todo-label"
          htmlFor={`todo-${id}`}
          style={{ textDecoration: completed ? "line-through" : "initial" }}
        >
          {name}
        </label>
      </div>
      <button
        type="button"
        className="btn btn__danger"
        onClick={() => deleteTask(id)}
      >
        Delete <span className="visually-hidden">{name}</span>
      </button>
    </li>
  );
}
