import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersAPI = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="app-container">
      <h1 className="main-title">📇 User List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> <br />
              📧 {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersAPI;
