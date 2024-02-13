import React, { useContext, useEffect, useState } from "react";
import classes from "./UpdateProfile.module.css";
import { Link, json, useNavigate } from "react-router-dom";
import { AuthContext } from "../Global/AuthContext";
import ProfileDetails from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { profileData } from "../../Store/ProfileDataRedux";
const UpdateProfile = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  console.log("token", token);
  // const authCtx = useContext(AuthContext);
  // console.log(authCtx.token);
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
    console.log("111111111111");
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBDWVbnQ6118boUJYGBZNlr-QiJ2E9fS5o",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("authToken"),
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
        dispatch(profileData(data.users));
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [token]);
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
          idToken: token,
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
      <Link to="/profileDetails">
        <button>Show Data</button>
      </Link>
      {/* <ProfileDetails data={authCtx.profileData} /> */}
      {console.log("2222222222")}
    </form>
  );
};
export default UpdateProfile;
