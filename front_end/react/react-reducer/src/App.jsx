import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { TodosProvider } from "./contexts/TodosContexts";
import AddTodo from "./pages/AddTodo";
import TodoList from "./pages/TodoList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TodosProvider>
        <h1>Todo List</h1>
        <AddTodo />
        <TodoList />
      </TodosProvider>
    </>
  );
}

export default App;
