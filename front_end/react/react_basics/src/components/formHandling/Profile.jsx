import React, { useState } from "react";
import ReactModal from "react-modal";
import ProfileForm from "./ProfileForm";
import ListCard from "./ListCard";
import { v4 as generateId } from "uuid";

// ReactModal.setAppElement("#root");

function Profile() {
  const [profiles, setProfiles] = useState([]);
  const [editingProfile, setEditingProfile] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const addProfile = (newProfile) => {
    newProfile.id = generateId();
    setProfiles((profiles) => [...profiles, newProfile]);
    setModalOpen(false);
  };

  const deleteProfile = (id) => {
    setProfiles((profiles) => profiles.filter((profile) => profile.id !== id));
  };

  const updateProfile = (updatedProfile) => {
    setProfiles((profiles) =>
      profiles.map((profile) =>
        profile.id === updatedProfile.id ? updatedProfile : profile
      )
    );
    setEditingProfile(null);
    setModalOpen(false);
  };

  const openEditModal = (profile) => {
    setEditingProfile(profile);
    setModalOpen(true);
  };

  return (
    <>
      <section className="container">
        <button onClick={() => setModalOpen(true)}>Create New Profile</button>
      </section>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            background: "transparent",
            border: "none",
            width: "90%", // Responsive width
            maxWidth: "500px", // Max width for large screens
            margin: "auto",
            padding: "20px",
            transition: "all 0.3s ease", // Smooth transition
            position: "relative",
            overflowX: "hidden", // Prevent horizontal overflow
          },
        }}
      >
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={() => setModalOpen(false)}
        >
          &times; {/* Close button (X) */}
        </button>
        <ProfileForm
          addProfile={editingProfile ? updateProfile : addProfile}
          initialData={editingProfile || {}}
          isEditing={Boolean(editingProfile)}
        />
      </ReactModal>

      <section className="profile-card">
        {profiles.map((profile) => (
          <ListCard
            key={profile.id}
            data={profile}
            onDelete={() => deleteProfile(profile.id)}
            onEdit={() => openEditModal(profile)}
          />
        ))}
      </section>
    </>
  );
}

export default Profile;
