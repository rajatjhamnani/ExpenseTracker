import React, { useState } from "react";
import classes from "./MyExpense.module.css";
import ShowExpenses from "./ShowExpenses";

const MyExpense = (props) => {
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const moneyChabgeHandler = (e) => {
    console.log(e.target.value);
    setMoney(e.target.value);
  };
  const descriptionHandlerr = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  };
  const categoryHandler = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      value: money,
      description: description,
      category: category,
    };

    fetch(
      "https://expense-tracker-87bd8-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("sending data request successful");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.errorMessage);
      });

    setData((prev) => {
      return [...prev, data];
    });
    setMoney("");
    setDescription("");
    setCategory("select");
  };
  return (
    <>
      <form onSubmit={submitHandler} className={classes.form}>
        <h1>My Expense Tracker</h1>
        <div>
          <div className={classes.money}>
            <label htmlFor="money">Money Spent</label>
            <input
              type="number"
              id="money"
              min={0}
              onChange={moneyChabgeHandler}
              value={money}
              required
            />
          </div>
          <div className={classes.money}>
            <label htmlFor="description">Description :</label>
            <input
              type="text"
              id="description"
              onChange={descriptionHandlerr}
              value={description}
              required
            />
          </div>
          <div className={classes.money}>
            <label htmlFor="categort">Category</label>
            <select
              id="category"
              onChange={categoryHandler}
              value={category}
              required
            >
              <option>select</option>
              <option>Food</option>
              <option>Travelling</option>
              <option>school Expenses</option>
              <option>Medicine</option>
              <option>Entertainment</option>
              <option>Fashion</option>
            </select>
          </div>
          <button type="submit">Add Expense</button>
        </div>
      </form>
      <ShowExpenses expense={data} />
    </>
  );
};
export default MyExpense;
