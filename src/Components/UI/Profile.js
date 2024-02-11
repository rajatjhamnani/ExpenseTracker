import React from "react";

import { useSelector } from "react-redux";

const ProfileDetails = (props) => {
  const data = useSelector((state) => state.profile.userData);
  console.log(data);
  return (
    <>
      <h1>Profiles</h1>

      {data.map((profile, index) => (
        <div key={index}>
          <p>Provider ID: {profile.providerId}</p>
          <p>Display Name: {profile.displayName}</p>
          <p>Email: {profile.email}</p>
          <p>Raw ID: {profile.rawId}</p>

          <img
            src={profile.photoUrl}
            alt={`Profile of ${profile.displayName}`}
          />
        </div>
      ))}
    </>
  );
};

export default ProfileDetails;
