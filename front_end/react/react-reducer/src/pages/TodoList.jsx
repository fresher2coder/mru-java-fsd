// src/components/TodoList.jsx
import React, { useState } from "react";
import { useTodo } from "../contexts/TodosContexts";

const TodoList = () => {
  const { todos, toggleTodo, deleteTodo, updateOrder } = useTodo();
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [tempOrder, setTempOrder] = useState(todos);

  // Sync tempOrder with todos
  React.useEffect(() => {
    setTempOrder(todos);
  }, [todos]);

  // Handle Drag Start
  const handleDragStart = (index) => {
    setDraggedItemIndex(index);
  };

  // Handle Drag Over
  const handleDragOver = (event, index) => {
    // event.preventDefault();
    if (draggedItemIndex === null) return;

    // Reorder items visually
    const newList = [...tempOrder];
    const draggedItem = newList.splice(draggedItemIndex, 1)[0]; //[a, b, c, d] [c] c
    newList.splice(index, 0, draggedItem);

    setTempOrder(newList);
    setDraggedItemIndex(index); //smooth transition
    updateOrder(tempOrder); // Persist new order to server
  };

  return (
    <ul className="todo-list">
      {tempOrder.map((todo, index) => (
        <li
          key={todo.id}
          className="todo-item"
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(event) => handleDragOver(event, index)}
        >
          <span
            className={`todo-text ${todo.completed ? "completed" : ""}`}
            onClick={() => toggleTodo(todo.id, todo.completed)}
          >
            {todo.text}
          </span>
          <button className="delete-button" onClick={() => deleteTodo(todo.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
