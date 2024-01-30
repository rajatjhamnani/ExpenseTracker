import React from "react";
import classes from "./ShowExpenses.module.css";
const ShowExpenses = (props) => {
  console.log("expense", props.expense);
  const data = props.expense;

  return (
    <>
      <div className={classes.start}>
        <h3>My Expenses</h3>
        {data.map((item, idx) => (
          <div key={idx} className={classes.expense}>
            <p>Description :-{item.description}</p>
            <p>Price :-${item.value}</p>
            <p>Category:-{item.category}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default ShowExpenses;
