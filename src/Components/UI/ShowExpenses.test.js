import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ShowExpenses from "./ShowExpenses";

const mockStore = configureStore([]);

describe("ShowExpenses Component", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      profile: {
        darkTheme: false,
      },
      auth: {
        token: "mockToken",
      },
    });
    localStorage.setItem("email", "test@example.com");
  });

  test("renders component with initial data", async () => {
    const expenses = [
      { id: "1", description: "Expense 1", value: 50, category: "Food" },
      { id: "2", description: "Expense 2", value: 75, category: "Utilities" },
    ];

    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(expenses),
      ok: true,
    });

    render(
      <Provider store={store}>
        <ShowExpenses />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Expense 1")).toBeInTheDocument();
      expect(screen.getByText("Expense 2")).toBeInTheDocument();
    });
  });

  test("deletes an expense", async () => {
    const expenses = [
      { id: "1", description: "Expense 1", value: 50, category: "Food" },
    ];

    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(expenses),
      ok: true,
    });

    render(
      <Provider store={store}>
        <ShowExpenses />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Expense 1")).toBeInTheDocument();
    });

    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
    });

    fireEvent.click(screen.getByText("Delete"));

    await waitFor(() => {
      expect(screen.queryByText("Expense 1")).not.toBeInTheDocument();
    });
  });
});
