import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";

function Users() {
  const { isLoggedIn } = useAuth();
  const { users, loading, error } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
  }, [isLoggedIn, navigate]);

  if (loading) return <div className="users-loading">Loading...</div>;
  if (error) return <div className="users-error">Error: {error.message}</div>;

  return (
    <div className="users-container">
      <h1 className="users-title">Users List</h1>
      <ul className="users-list">
        {users.map((user) => (
          <li className="users-item" key={user.id}>
            <Link to={`/users/${user.id}`} className="users-link">
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}

export default Users;
