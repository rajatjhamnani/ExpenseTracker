import React, { useState, useEffect } from "react";
import classes from "./ShowExpenses.module.css";

const ShowExpenses = (props) => {
  const [fetchedData, setFetchedData] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

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
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://expense-tracker-87bd8-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Delete Request Failed");
      }
      setFetchedData((prevData) => prevData.filter((item) => item.id !== id));
      console.log(`Expense with id ${id} deleted successfully`);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEdit = (id) => {
    const expenseToEdit = fetchedData.find((item) => item.id === id);
    setEditingExpense(expenseToEdit);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  const handleSaveEdit = async (editedExpense) => {
    try {
      const response = await fetch(
        `https://expense-tracker-87bd8-default-rtdb.firebaseio.com/expenses/${editedExpense.id}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedExpense),
        }
      );

      if (!response.ok) {
        throw new Error("Edit Request Failed");
      }

      setFetchedData((prevData) =>
        prevData.map((item) =>
          item.id === editedExpense.id ? editedExpense : item
        )
      );

      setEditingExpense(null);
      console.log(`Expense with id ${editedExpense.id} edited successfully`);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className={classes.start}>
        <h3>My Expenses</h3>
        {fetchedData.map((item) => (
          <div key={item.id} className={classes.expense}>
            <p>Description: {item.description}</p>
            <p>Price: ${item.value}</p>
            <p>Category: {item.category}</p>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
            <button onClick={() => handleEdit(item.id)}>Edit Expense</button>

            {editingExpense && editingExpense.id === item.id && (
              <div>
                <input
                  type="text"
                  value={editingExpense.description}
                  onChange={(e) =>
                    setEditingExpense({
                      ...editingExpense,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={editingExpense.value}
                  onChange={(e) =>
                    setEditingExpense({
                      ...editingExpense,
                      value: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={editingExpense.category}
                  onChange={(e) =>
                    setEditingExpense({
                      ...editingExpense,
                      category: e.target.value,
                    })
                  }
                />
                <button onClick={() => handleSaveEdit(editingExpense)}>
                  Save
                </button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowExpenses;
