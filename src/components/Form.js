import React, { useState } from "react";

function Form({ addTask }) {
  const [name, setName] = useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (name !== "") addTask(name);
    setName("");
  }

  return (
    <form onSubmit={handleSubmit} className="mainForm">
      <input
        type="text"
        id="new-todo-input"
        className="input inputForm"
        name="text"
        autoComplete="off"
        placeholder="What needs to be done?"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btnPrimary btnLg">
        Add
      </button>
    </form>
  );
}

export default Form;
