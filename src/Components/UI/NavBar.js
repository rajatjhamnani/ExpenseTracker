import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import classes from "./NavBar.module.css";
import Button from "react-bootstrap/esm/Button";
import { AuthContext } from "../Global/AuthContext";
import { logout } from "../../Store/AuthRedux";
const NavBar = (props) => {
  const dispatch = useDispatch();
  //const authCtx = useContext(AuthContext);
  //const isLogin = authCtx.isLoggedin;
  const isLogin = useSelector((state) => state.auth.userIsLoggedIn);
  return (
    <div className={classes.navbar}>
      <Navbar expand="lg" className={classes.navbar}>
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            Expense Tracker
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isLogin && (
                <Nav.Link as={NavLink} to="/">
                  Home
                </Nav.Link>
              )}
              {isLogin && (
                <Nav.Link as={NavLink} to="/myExpense">
                  My Expense
                </Nav.Link>
              )}
              {isLogin && (
                <Nav.Link as={NavLink} to="/">
                  About Us
                </Nav.Link>
              )}
              {!isLogin && (
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          {isLogin && (
            <Link to="/login">
              <Button onClick={() => dispatch(logout())}>logout</Button>
            </Link>
          )}
        </Container>
      </Navbar>
    </div>
  );
};
export default NavBar;
