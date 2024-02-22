"use client";

import { useState } from "react";
import "./app.css";

interface TodoItem {
  id: string;
  name: string;
}

const TODOS_KEY = "todos";

const DUMMY_ITEMS: Array<TodoItem> = [
  {
    id: "1",
    name: "Todo Item 1",
  },
  {
    id: "2",
    name: "Todo Item 2",
  },
  {
    id: "3",
    name: "Todo Item 3",
  },
  {
    id: "4",
    name: "Todo Item 4",
  },
];

export default function HomePage() {
  const [todos, setTodos] = useState<Array<TodoItem>>(() => {
    const rawTodos = localStorage.getItem(TODOS_KEY);

    if (!rawTodos) {
      return DUMMY_ITEMS;
    }

    return JSON.parse(rawTodos) as Array<TodoItem>;
  });

  const [nameValue, setNameValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTodos((oldTodos) => {
      const newTodos = [
        ...oldTodos,
        { id: `${Math.random()}`, name: nameValue },
      ];

      localStorage.setItem(TODOS_KEY, JSON.stringify(newTodos));

      return newTodos;
    });

    setNameValue("");
  };

  const onItemDelete = (id: string) => () => {
    setTodos((oldTodos) => {
      const newTodos = oldTodos.filter((item) => item.id !== id);

      localStorage.setItem(TODOS_KEY, JSON.stringify(newTodos));

      return newTodos;
    });
  };

  return (
    <main className="HomePage">
      <h1 className="HomePage-heading">Hello Todos</h1>

      <form className="HomePage-form" onSubmit={handleSubmit}>
        <input
          className="HomePage-form-input"
          type="type"
          placeholder="Enter a todo"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />

        <button className="HomePage-form-submit" type="submit">
          Add
        </button>
      </form>

      <ul className="HomePage-list">
        {todos.map(({ id, name }) => (
          <li key={id} className="HomePage-list-item">
            <div>{name}</div>

            <button
              className="HomePage-list-item-delete"
              onClick={onItemDelete(id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
