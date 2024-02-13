import React from "react";
import classes from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import image from "../images/pay.jpg";
const Home = (props) => {
  const navigate = useNavigate();
  const moveToExpenseHandler = () => {
    navigate("/myExpense");
  };
  return (
    <>
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
      <div className={classes.image}>
        <img src={image} alt="image" />
      </div>
      <div className={classes.never}>
        <button onClick={moveToExpenseHandler}>
          Click to see your Expenses
        </button>
      </div>
    </>
  );
};
export default Home;
