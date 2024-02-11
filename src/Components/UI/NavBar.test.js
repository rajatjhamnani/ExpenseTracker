import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; // Assuming you have redux-mock-store installed

import NavBar from "./NavBar";
import { logout } from "../../Store/AuthRedux";

const mockStore = configureStore();

describe("NavBar Component", () => {
  it("renders NavBar component correctly", () => {
    const initialState = {
      profile: {
        darkTheme: false,
      },
      auth: {
        userIsLoggedIn: false,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Expense Tracker/i)).toBeInTheDocument();
  });

  it('renders "Logout" button when user is logged in', () => {
    const initialState = {
      profile: {
        darkTheme: true,
      },
      auth: {
        userIsLoggedIn: true,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it('dispatches logout action when "Logout" button is clicked', () => {
    const initialState = {
      profile: {
        darkTheme: true,
      },
      auth: {
        userIsLoggedIn: true,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Logout/i));
    expect(store.getActions()).toEqual([logout()]);
  });
});
