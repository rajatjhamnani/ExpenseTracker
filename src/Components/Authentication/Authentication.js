import React, { useState } from "react";
import classes from "./Authentication.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const Authentication = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const buttonToggler = () => {
    setIsLogin((prev) => {
      return !prev;
    });
  };
  const emailHandler = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  const confirmPasswordHandler = (e) => {
    console.log(e.target.value);
    setConfirmPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    console.log(data);
    if (isLogin) {
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDWVbnQ6118boUJYGBZNlr-QiJ2E9fS5o",
        {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          console.log("user has successfully signed up");
        } else {
          return res.json().then((data) => {
            console.log(data);
          });
        }
      });
    }
  };
  return (
    <>
      <section className={classes.auth}>
        {" "}
        <Form onSubmit={submitHandler}>
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>
          <Form.Group className={classes.lab} controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={emailHandler}
              required
            />
          </Form.Group>

          <Form.Group className={classes.lab} controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={passwordHandler}
              required
            />
          </Form.Group>
          <Form.Group className={classes.lab} controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={confirmPasswordHandler}
              required
            />
          </Form.Group>

          <Button variant="primary" className={classes.btn} type="submit">
            {isLogin ? "Login" : "SignUp"}
          </Button>
        </Form>
        <button onClick={buttonToggler} className={classes.block}>
          {isLogin ? "Create a New  Account" : "Have an account? Login"}
        </button>
      </section>
    </>
  );
};

export default Authentication;
