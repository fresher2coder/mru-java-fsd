import React from "react";

function UserProfile(props) {
  const { name, email, age, address } = props;

  return (
    <>
      <section className="userProfile">
        <h2>{name}</h2>
        <p>{age}</p>
        <p>{email}</p>
        <p>{address}</p>
      </section>
    </>
  );
}

export default UserProfile;
