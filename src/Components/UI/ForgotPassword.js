import React, { useState } from "react";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBDWVbnQ6118boUJYGBZNlr-QiJ2E9fS5o",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        console.log("New password request sent successfully", data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="email">Enter your email</label>
      <input type="email" id="email" onChange={emailHandler} />
      <button type="submit">Forgot Password</button>
    </form>
  );
};

export default ForgotPassword;
