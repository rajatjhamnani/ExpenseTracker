import React, { useContext } from "react";

const ProfileDetails = (props) => {
  console.log(props.data);

  return (
    <>
      <h1>Profiles</h1>

      {props.data.map((profile, index) => (
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
