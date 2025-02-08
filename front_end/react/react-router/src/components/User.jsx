import React, { useState } from "react";
import { useParams } from "react-router-dom";

function User() {
  const [users, setUsers] = useState([
    { id: 1, name: "Dineshkumar", occupation: "Technical Trainer" },
    { id: 2, name: "Divya Dineshkumar", occupation: "Molucular Biologist" },
  ]);

  const { userId } = useParams();
  const user = users.find((u) => u.id === parseInt(userId));
  return (
    <>
      {user && (
        <>
          <h2>Name: {user.name}</h2>
          <h3>Occupation: {user.occupation}</h3>
        </>
      )}

      {!user && <h2>User not exist</h2>}
    </>
  );
}

export default User;
