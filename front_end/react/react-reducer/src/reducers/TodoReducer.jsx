import React, { useReducer } from "react";

// src/reducers/TodoReducer.js
export const TodoReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return action.payload;

    case "ADD":
      return [...state, action.payload];

    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload);

    case "UPDATE":
      return action.payload;

    default:
      return state;
  }
};
