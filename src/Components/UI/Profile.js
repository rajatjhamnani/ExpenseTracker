import React, { useContext } from "react";
import { AuthContext } from "../Global/AuthContext";

const ProfileDetails = (props) => {
  console.log(props.data);
  const authCtx = useContext(AuthContext);
  return (
    <>
      <h1>Profiles</h1>

      {authCtx.profileData.map((profile, index) => (
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
