import React, { useState } from "react";
import { v4 as generateID } from "uuid";
import ProfileForm from "./ProfileForm";
import ListCard from "./ListCard";

function Profile() {
  const [profiles, setProfiles] = useState([]);

  const deleteProfile = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  const addProfile = (newProfile) => {
    const updatedProfile = { ...newProfile, id: generateID() };
    setProfiles((prevProfiles) => [...prevProfiles, updatedProfile]);
    console.log(profiles);
  };
  return (
    <>
      <ProfileForm addProfile={addProfile} />
      <div className="profile-card">
        {profiles.map((profile) => (
          <ListCard
            key={profile.id}
            id={profile.id}
            data={profile}
            deleteProfile={deleteProfile}
          />
        ))}
      </div>
    </>
  );
}

export default Profile;
