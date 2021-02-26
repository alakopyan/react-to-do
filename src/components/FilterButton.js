import React from "react";

function FilterButton({setFilter, isPressed, name}) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span>{name}</span>
    </button>
  );
}

export default FilterButton;
