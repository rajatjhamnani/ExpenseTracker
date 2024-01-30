import React, { useState, useEffect } from "react";
import classes from "./ShowExpenses.module.css";

const ShowExpenses = (props) => {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://expense-tracker-87bd8-default-rtdb.firebaseio.com/expenses.json",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Authentication failed");
        }

        const data = await response.json();
        const dataArray = Object.entries(data).map(([id, entry]) => ({
          id,
          ...entry,
        }));
        setFetchedData(dataArray);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [fetchedData]);

  return (
    <>
      <div className={classes.start}>
        <h3>My Expenses</h3>
        {fetchedData.map((item) => (
          <div key={item.id} className={classes.expense}>
            <p>Description: {item.description}</p>
            <p>Price: ${item.value}</p>
            <p>Category: {item.category}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowExpenses;
