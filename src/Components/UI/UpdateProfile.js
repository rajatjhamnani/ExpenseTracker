import React, { useContext, useEffect, useState } from "react";
import classes from "./UpdateProfile.module.css";
import { Link, json, useNavigate } from "react-router-dom";
import { AuthContext } from "../Global/AuthContext";
import ProfileDetails from "./Profile";
const UpdateProfile = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  console.log(authCtx.token);
  const [name, setName] = useState();
  const [photoUrl, setPhotoUrl] = useState();
  const nameHandler = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const urlHandler = (e) => {
    console.log(e.target.value);
    setPhotoUrl(e.target.value);
  };

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBDWVbnQ6118boUJYGBZNlr-QiJ2E9fS5o",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("worked successfully 1s");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data.users);
        authCtx.data(data.users);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      fullName: name,
      url: photoUrl,
    };
    console.log(data);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBDWVbnQ6118boUJYGBZNlr-QiJ2E9fS5o",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          displayName: data.fullName,
          photoUrl: data.url,
          returnSecureToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("update request successful");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
    setName("");
    setPhotoUrl("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.back}>
        <h2 className={classes.lab}>Contact Details</h2>

        <button onClick={() => navigate("/")}>back to home</button>
      </div>
      <div className={classes.profile}>
        <div className={classes.space}>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" onChange={nameHandler} value={name} />
        </div>
        <div className={classes.space}>
          <label htmlFor="name">Profile photo url</label>
          <input type="url" id="name" onChange={urlHandler} value={photoUrl} />
        </div>
      </div>
      <div className={classes.btn}>
        <button type="submit">Update</button>
      </div>
      <ProfileDetails data={authCtx.profileData} />
    </form>
  );
};
export default UpdateProfile;
