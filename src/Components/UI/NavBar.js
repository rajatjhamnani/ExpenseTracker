import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import classes from "./NavBar.module.css";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../Global/AuthContext";
import { logout } from "../../Store/AuthRedux";
const NavBar = (props) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.profile.darkTheme);
  console.log(theme);

  const isLogin = useSelector((state) => state.auth.userIsLoggedIn);
  return (
    <div className={theme ? classes.navbar : classes.darknavbar}>
      <Navbar
        expand="lg"
        className={theme ? classes.navbar : classes.darknavbar}
      >
        <Container>
          <Navbar.Brand as={NavLink} to="/front">
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
