import React from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../contexts/UsersContext";

function User() {
  const { users, loading, error } = useUser();
  const { id } = useParams();
  const user = users.find((u) => u.id === parseInt(id));

  if (loading) return <div className="user-loading">Loading...</div>;
  if (error) return <div className="user-error">Error: {error.message}</div>;

  return (
    <div className="user-container">
      {user ? (
        <>
          <h1 className="user-title">{user.name}</h1>
          <h3 className="user-detail">Username: {user.username}</h3>
          <h3 className="user-detail">Email: {user.email}</h3>
          <h3 className="user-detail">Phone: {user.phone}</h3>
          <h3 className="user-detail">
            Address: {user.address.street}, {user.address.city}
          </h3>
          <h3 className="user-detail">Company: {user.company.name}</h3>
          <h3 className="user-detail">Website: {user.website}</h3>
        </>
      ) : (
        <div className="user-error">User not found</div>
      )}
    </div>
  );
}

export default User;
