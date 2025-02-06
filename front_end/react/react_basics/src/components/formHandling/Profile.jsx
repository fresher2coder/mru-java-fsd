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
    // Check if a profile with the same fullname already exists
    const isDuplicate = profiles.some(
      (profile) =>
        profile.fullname.toLowerCase() === newProfile.fullname.toLowerCase()
    );

    if (isDuplicate) {
      alert("A profile with this fullname already exists!");
      return; // Exit without adding the profile
    }

    // If not a duplicate, add the new profile
    newProfile.id = generateId();
    setProfiles((profiles) => [...profiles, newProfile]);
    setModalOpen(false);
  };

  const deleteProfile = (id) => {
    setProfiles((profiles) => profiles.filter((profile) => profile.id !== id));
  };

  const updateProfile = (updatedProfile) => {
<<<<<<< HEAD
    setProfiles((prevprofiles) =>
      prevprofiles.map((profile) =>
=======
    setProfiles((profiles) =>
      profiles.map((profile) =>
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
        profile.id === updatedProfile.id ? updatedProfile : profile
      )
    );
    setEditingProfile(null);
    setModalOpen(false);
  };

<<<<<<< HEAD
  const openEditModel = (profile) => {
=======
  const openEditModal = (profile) => {
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
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
<<<<<<< HEAD
          profile={editingProfile ? updateProfile : addProfile}
=======
          addProfile={editingProfile ? updateProfile : addProfile}
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
          initialData={editingProfile || {}}
          isEditing={Boolean(editingProfile)}
        />
      </ReactModal>

      <section className="profile-card">
        {profiles.map((profile) => (
          <ListCard
            key={profile.id}
            data={profile}
<<<<<<< HEAD
            onDelete={deleteProfile}
            onEdit={openEditModel}
=======
            onDelete={() => deleteProfile(profile.id)}
            onEdit={() => openEditModal(profile)}
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
          />
        ))}
      </section>
    </>
  );
}

export default Profile;
