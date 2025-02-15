// src/context/TodosContexts.jsx
import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { TodoReducer } from "../reducers/TodoReducer";

export const TodosContexts = createContext();

const API_URL = "http://localhost:5000/todos";

// Initial State
const initialState = [];

// Fetch Todos from json-server
const fetchTodos = async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}?_sort=order`);
    dispatch({ type: "SET_TODOS", payload: response.data });
  } catch (error) {
    console.error("Failed to fetch todos:", error);
  }
};

// Add Todo to json-server and state
const addTodoAPI = async (text, todos, dispatch) => {
  const newOrder = todos.length + 1;
  const newTodo = { text, completed: false, order: newOrder };

  try {
    const response = await axios.post(API_URL, newTodo);
    // Optimistically update state
    dispatch({ type: "ADD", payload: newTodo });
  } catch (error) {
    console.error("Failed to add todo:", error);
  }
};

// Delete Todo from json-server and state
const deleteTodoAPI = async (id, dispatch) => {
  console.log(id);
  try {
    await axios.delete(`${API_URL}/${id}`);
    // Optimistically update state
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.error("Failed to delete todo:", error);
  }
};

// Update Order in json-server
// Update Order in json-server
const updateOrderAPI = async (todos, dispatch) => {
  try {
    // Loop through each todo and update its order
    const updateRequests = todos.map((todo, index) =>
      axios.patch(`${API_URL}/${todo.id}`, { order: index + 1 })
    );

    // Wait for all requests to complete
    await Promise.all(updateRequests);

    // Update the state after successful API updates
    dispatch({ type: "UPDATE_ORDER", payload: todos });
  } catch (error) {
    console.error("Failed to update order:", error);
  }
};

// Toggle Todo completion on json-server
const toggleTodoAPI = async (id, completed, dispatch) => {
  // Optimistically update state
  dispatch({ type: "TOGGLE", payload: id });

  try {
    await axios.patch(`${API_URL}/${id}`, { completed: !completed });
  } catch (error) {
    console.error("Failed to toggle todo:", error);
    // Rollback on error
    fetchTodos(dispatch);
  }
};

export const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(TodoReducer, initialState);

  useEffect(() => {
    fetchTodos(dispatch);
  }, []);

  const addTodo = (text) => addTodoAPI(text, todos, dispatch);
  const deleteTodo = (id) => deleteTodoAPI(id, dispatch);
  const toggleTodo = (id, completed) => toggleTodoAPI(id, completed, dispatch);
  const updateOrder = (newOrder) => updateOrderAPI(newOrder, dispatch);

  return (
    <TodosContexts.Provider
      value={{ todos, addTodo, deleteTodo, toggleTodo, updateOrder }}
    >
      {children}
    </TodosContexts.Provider>
  );
};

export const useTodo = () => useContext(TodosContexts);
