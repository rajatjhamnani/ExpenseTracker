import React from "react";
import image from "../images/expenses.jpg";
const FrontPage = (props) => {
  return (
    <div
      style={{
        textAlign: "center",
        border: "2px solid grey",
        borderRadius: "10px",
        backgroundColor: "lightGrey",
        marginTop: "2px",
      }}
    >
      <h1>Track Your Expenses Here</h1>
      <img src={image} alt="Expense Tracker" />
    </div>
  );
};
export default FrontPage;
