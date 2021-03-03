import "./App.css";
import Todo from "./components/Todo.js";
import Form from "./components/Form.js";
import FilterButton from "./components/FilterButton.js";
import React, { useState, useEffect } from "react";
import sendRequest from "./service/ApiService.js";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.isDone,
  Completed: (task) => task.isDone,
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
  }, [tasks]);

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        key={task._id}
        id={task._id}
        name={task.title}
        completed={task.isDone}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const fetchAll = () =>
    sendRequest(``, "GET")
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

  useEffect(() => {
    fetchAll();
  }, []);

  function updateTask(id) {
    sendRequest(`${id}/done`, "PUT").then(() => {
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
    sendRequest(``, `POST`, { title: name }).then(() => {
      fetchAll();
    });
  }

  function deleteTask(id) {
    sendRequest(`${id}`, "DELETE")
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
