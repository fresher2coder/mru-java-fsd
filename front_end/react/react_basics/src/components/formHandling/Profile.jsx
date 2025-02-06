import React, { useState } from "react";
import ReactModal from "react-modal";
import ProfileForm from "./ProfileForm";
import ListCard from "./ListCard";
import { v4 as generateId } from "uuid";

ReactModal.setAppElement("#root");

function Profile() {
  const [profiles, setProfiles] = useState([]);
  const [editingProfile, setEditingProfile] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const addProfile = (newProfile) => {
    // If not a duplicate, add the new profile
    newProfile.id = generateId();
    setProfiles((profiles) => [...profiles, newProfile]);
    setModalOpen(false);
  };

  const deleteProfile = (id) => {
    setProfiles((profiles) => profiles.filter((profile) => profile.id !== id));
  };

  const updateProfile = () => {};

  return (
    <>
      <section className="container">
        <button onClick={() => setModalOpen(true)}>Create New Profile</button>
      </section>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="ReactModal__Content ReactModal__Overlay"
      >
        <button
          className="modal-close-button"
          onClick={() => setModalOpen(false)}
        >
          &times; {/* Close button (X) */}
        </button>
        <ProfileForm addProfile={addProfile} />
      </ReactModal>

      <section className="profile-card">
        {profiles.map((profile) => (
          <ListCard
            key={profile.id}
            id={profile.id}
            data={profile}
            onDelete={deleteProfile}
          />
        ))}
      </section>
    </>
  );
}

export default Profile;
