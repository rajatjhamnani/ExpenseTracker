import React from "react";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";
const Home = (props) => {
  return (
    <div className={classes.home}>
      <div className={classes.font}>
        <h1>welcome to Expense Tracker</h1>
      </div>
      <div className={classes.complete}>
        <Link to="/updateProfile">
          <h3>Complete your Profile</h3>
        </Link>
        <Link to="/verifyEmail">
          <button>Verify Email</button>
        </Link>
      </div>
    </div>
  );
};
export default Home;
