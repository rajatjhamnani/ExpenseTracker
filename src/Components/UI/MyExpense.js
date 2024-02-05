import React, { useState } from "react";
import classes from "./MyExpense.module.css";
import ShowExpenses from "./ShowExpenses";

const MyExpense = (props) => {
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);

  const moneyChangeHandler = (e) => {
    setMoney(e.target.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const expenseData = {
      value: money,
      description: description,
      category: category,
    };

    try {
      const response = await fetch(
        "https://expense-tracker-87bd8-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          body: JSON.stringify(expenseData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Sending data request successful");
        const responseData = await response.json();
        console.log(responseData);
        setData((prev) => [...prev, expenseData]);
        setMoney("");
        setDescription("");
        setCategory("select");
      } else {
        const errorData = await response.json();
        console.log("Error:", errorData);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
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
              onChange={moneyChangeHandler}
              value={money}
              required
            />
          </div>
          <div className={classes.money}>
            <label htmlFor="description">Description :</label>
            <input
              type="text"
              id="description"
              onChange={descriptionHandler}
              value={description}
              required
            />
          </div>
          <div className={classes.money}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              onChange={categoryHandler}
              value={category}
              required
            >
              <option>select</option>
              <option>Food</option>
              <option>Travelling</option>
              <option>School Expenses</option>
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
