import "./App.css";
import Todo from "./components/Todo.js";
import Form from "./components/Form.js";
import FilterButton from "./components/FilterButton.js";
import React, { useState, useEffect } from "react";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [tasksRemaining, setTasksRemaining] = useState(0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTasksRemaining(tasks.filter((task) => !task.completed).length);
  });

  console.log("tasks => ", tasks);

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task._id}
        name={task.title}
        completed={task.isDone}
        key={task.id}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    ));

  console.log("taskList", taskList);

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  useEffect(() => {
    fetch("https://exceed-todo-list.herokuapp.com/api/v1/todos", {
      method: "GET",
      headers: {
        apikey: "39d77f49-c419-43c9-8cad-02e8e7fc9a83",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setTasks(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  function updateTask(id) {
    fetch(`https://exceed-todo-list.herokuapp.com/api/v1/todos/${id}/done`, {
      method: "PUT",
      headers: {
        apikey: "39d77f49-c419-43c9-8cad-02e8e7fc9a83",
        "Content-Type": "application/json",
      },
    }).then(() => {
      const completedTasks = tasks.map((item) => {
        if (id === item._id) {
          item.isDone = !item.isDone;
        }
        return item;
      });
      setTasks(completedTasks);
    });
  }

  function addTask(name) {
    fetch("https://exceed-todo-list.herokuapp.com/api/v1/todos", {
      method: "POST",
      headers: {
        apikey: "39d77f49-c419-43c9-8cad-02e8e7fc9a83",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: name }),
    }).then(() => setTasks(tasks));
  }

  function deleteTask(id) {
    fetch(`https://exceed-todo-list.herokuapp.com/api/v1/todos/${id}`, {
      method: "DELETE",
      headers: {
        apikey: "39d77f49-c419-43c9-8cad-02e8e7fc9a83",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        const updatedTask = tasks.filter((item) => item._id !== id);
        setTasks(updatedTask);
      })
      .catch(() => {
        console.log("Error");
      });
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div>
        <div className="headTodo">todos</div>

        <div className="toDo">
          <Form addTask={addTask} />

          <ul className="toDoList">{taskList}</ul>

          <div className="bottomLine">
            <p id="listHeading">{tasksRemaining} items left</p>
            <div className="filters btnGroup stackException">{filterList}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
