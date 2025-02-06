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

  const updateProfile = (updatedProfile) => {
    setProfiles((prevprofiles) =>
      prevprofiles.map((profile) =>
        profile.id === updatedProfile.id ? updatedProfile : profile
      )
    );
    setEditingProfile(null);
    setModalOpen(false);
  };

  const openEditModel = (profile) => {
    setEditingProfile(profile);
    setModalOpen(true);
  };

  return (
    <>
      <section className="container">
        <button
          onClick={() => {
            setEditingProfile(null);
            setModalOpen(true);
          }}
        >
          Create New Profile
        </button>
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
        <ProfileForm
          profile={editingProfile ? updateProfile : addProfile}
          initialData={editingProfile || {}}
          isEditing={Boolean(editingProfile)}
        />
      </ReactModal>

      <section className="profile-card">
        {profiles.map((profile) => (
          <ListCard
            key={profile.id}
            id={profile.id}
            data={profile}
            onDelete={deleteProfile}
            onEdit={openEditModel}
          />
        ))}
      </section>
    </>
  );
}

export default Profile;
