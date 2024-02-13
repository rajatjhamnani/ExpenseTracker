import React, { useState, useEffect } from "react";
import classes from "./ShowExpenses.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../Store/ProfileDataRedux";

const ShowExpenses = (props) => {
  const [fetchedData, setFetchedData] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [darkTheme, setDarkTheme] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.profile.darkTheme);
  const token = useSelector((state) => state.auth.token);
  const email = localStorage.getItem("email");
  const newEmail = email.replace(/[^\w\s]/gi, "");

  const changeThemeHandler = () => {
    setDarkTheme((prev) => !prev);
    dispatch(changeTheme(darkTheme));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://expense-tracker-87bd8-default-rtdb.firebaseio.com/${newEmail}.json`,
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
  }, [props.expense]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://expense-tracker-87bd8-default-rtdb.firebaseio.com/${newEmail}/${id}.json`,
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
        `https://expense-tracker-87bd8-default-rtdb.firebaseio.com/${newEmail}/${editedExpense.id}.json`,
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

  const calculateTotalExpense = () => {
    return fetchedData.reduce(
      (total, expense) => total + parseFloat(expense.value),
      0
    );
  };
  const downloadCSV = () => {
    const csvContent =
      "Description,Price,Category\n" +
      fetchedData
        .map((item) => `${item.description},${item.value},${item.category}`)
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "expenses.csv");

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <>
      <div className={theme ? classes.start : classes.darkStart}>
        <h3>My Expenses</h3>
        <div className={classes.download}>
          <button onClick={downloadCSV}>Download</button>
        </div>

        <table className={classes.expenseTable}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fetchedData.map((item) => (
              <tr key={item.id}>
                <td>{item.description}</td>
                <td>${item.value}</td>
                <td>{item.category}</td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                  <button onClick={() => handleEdit(item.id)}>
                    Edit Expense
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingExpense && (
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
              type="number"
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
            <button onClick={() => handleSaveEdit(editingExpense)}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        )}

        <div className={classes.totalExpenses}>
          <p>
            <b>Total Expenses = ${calculateTotalExpense().toFixed(2)}</b>
          </p>
        </div>
        {calculateTotalExpense() > 1000 ? (
          <div className={classes.rest}>
            <button onClick={changeThemeHandler}>Activate Premium</button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ShowExpenses;
