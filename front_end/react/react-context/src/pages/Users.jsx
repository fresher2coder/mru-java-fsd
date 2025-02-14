import React, { useEffect } from "react";
import { useUser } from "../contexts/UsersContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Users() {
  const { isLoggedIn } = useAuth();
  const { users, loading, error } = useUser();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/login");
    return;
  }

  if (loading) {
    return (
      <>
        <section className="users-loading">
          <h2>Loading...</h2>
        </section>
        ;
      </>
    );
  }

  if (error) {
    return (
      <>
        <section className="users-error">
          <h2>Error: {error.message}</h2>
        </section>
      </>
    );
  }
  return (
    <>
      <section className="users-container">
        <h1 className="users-title">Users List</h1>

        <ul className="users-list">
          {users.map((user) => (
            <>
              <li className="users-item">
                <Link className="users-link" to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </li>
            </>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Users;
