import React from "react";

const VerifyEmail = (props) => {
  fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBDWVbnQ6118boUJYGBZNlr-QiJ2E9fS5o",
    {
      method: "POST",
      body: JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: localStorage.getItem("idToken"),
      }),
      headers: {
        "content-type": "application/json",
      },
    }
  )
    .then((res) => {
      if (res.ok) {
        console.log("request successful");
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
      alert(err.errorMessage);
    });
  return (
    <>
      <h1> Verificatin Link is Sent to Your e-mail</h1>
    </>
  );
};
export default VerifyEmail;
