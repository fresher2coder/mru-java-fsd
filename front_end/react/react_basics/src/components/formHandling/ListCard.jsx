import React from "react";

function ListCard({ id, data, deleteProfile }) {
  return (
    <>
      <div className="card">
        <h3>Id: {id}</h3>
        <p>Name: {data.name}</p>
        {data.age && <p>Age: {data.age}</p>}
        {data.occupation && <p>Occuputation: {data.occupation}</p>}
        <div className="btns">
          <button
            type="button"
            onClick={() => {
              deleteProfile(id);
            }}
          >
            Delete Profile
          </button>
        </div>
      </div>
    </>
  );
}

export default ListCard;
