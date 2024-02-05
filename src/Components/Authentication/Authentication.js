import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./Authentication.module.css";
import { Link, NavLink, json, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../Global/AuthContext";
import { login } from "../../Store/AuthRedux";
const Authentication = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //const authCtx = useContext(AuthContext);

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
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDWVbnQ6118boUJYGBZNlr-QiJ2E9fS5o";
    } else {
      if (password === confirmPassword) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDWVbnQ6118boUJYGBZNlr-QiJ2E9fS5o";
      } else {
        alert("passowrd mismatch please try again");
        setIsLoading(false);
      }
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        returnSecureToken: true,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          console.log("Request Successful");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data.idToken);
        //authCtx.login(data.idToken, data.email);
        dispatch(login([data.idToken, data.email]));

        {
          isLogin && navigate("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
              value={email}
            />
          </Form.Group>

          <Form.Group className={classes.lab} controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={passwordHandler}
              required
              value={password}
            />
          </Form.Group>
          {!isLogin && (
            <Form.Group className={classes.lab} controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={confirmPasswordHandler}
                required
                value={confirmPassword}
              />
            </Form.Group>
          )}

          {!isLoading && (
            <Button variant="primary" className={classes.btn} type="submit">
              {isLogin ? "Login" : "SignUp"}
            </Button>
          )}
          {isLoading && <h3>sending request ....</h3>}
          {isLogin && (
            <NavLink to="/forgotPassword" className={classes.lin}>
              <h3>Forgot Password</h3>
            </NavLink>
          )}
        </Form>
        <button onClick={buttonToggler} className={classes.block}>
          {isLogin ? "Donot have Account ? SignUp" : "Have an account? Login"}
        </button>
      </section>
    </>
  );
};

export default Authentication;
