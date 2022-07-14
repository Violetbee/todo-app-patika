import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [input, setInput] = useState({
    todoName: "",
    isDone: false,
    id: 0,
  });
  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const [list, setList] = useState([]);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInput({ isDone: false, todoName: "", id: Date.now() });
    setList([...list, input]);
  };

  const checkActive = (id) => {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  const deleteTodo = (id) => {
    setList(
      list.filter((item) => {
        return item.id !== id;
      })
    );
  };

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={onSubmitHandler}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              onChange={inputHandler}
              value={input.todoName}
              name="todoName"
              id={input.id}
            />
          </form>
        </header>

        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {list.map((item) => {
              return (
                <li
                  key={item.id}
                  className={item.isDone ? "completed" : undefined}
                >
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      onClick={() => {
                        checkActive(item.id);
                      }}
                    />
                    <label>{item.todoName}</label>
                    <button
                      className="destroy"
                      onClick={() => {
                        deleteTodo(item.id);
                      }}
                    ></button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{list.length} </strong>
            yapılacak var
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className="selected">
                All
              </a>
            </li>
            <li>
              <a href="#/">Active</a>
            </li>
            <li>
              <a href="#/">Completed</a>
            </li>
          </ul>

          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>

      <footer className="info">
        <p>Click to edit a todo</p>
        <p>
          Created by <a href="https://d12n.me/">Dmitry Sharabin</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
