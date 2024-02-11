import { render, screen } from "@testing-library/react";

import MyExpense from "./MyExpense";
import { Provider } from "react-redux";
import store from "../../Store/Store";
describe("MyExpense Component", () => {
  test("renders Add Expense as a text", () => {
    render(
      <Provider store={store}>
        <MyExpense />
      </Provider>
    );
    const forgotPasswordElement = screen.getByText("Add Expense");
    expect(forgotPasswordElement).toBeInTheDocument();
  });
  test("renders Entertainment as a text", () => {
    render(
      <Provider store={store}>
        <MyExpense />
      </Provider>
    );
    const EntertainmentElement = screen.getByText("Entertainment");
    expect(EntertainmentElement).toBeInTheDocument();
  });
  test("renders expenses as a text", () => {
    render(
      <Provider store={store}>
        <MyExpense />
      </Provider>
    );
    const expensesElement = screen.getByText("School Expenses");
    expect(expensesElement).toBeInTheDocument();
  });
  test("renders Food as a text", () => {
    render(
      <Provider store={store}>
        <MyExpense />
      </Provider>
    );
    const FoodElement = screen.getByText("Food");
    expect(FoodElement).toBeInTheDocument();
  });
  test("renders Travelling as a text", () => {
    render(
      <Provider store={store}>
        <MyExpense />
      </Provider>
    );
    const TravellingElement = screen.getByText("Travelling");
    expect(TravellingElement).toBeInTheDocument();
  });
  test("renders Medicine as a text", () => {
    render(
      <Provider store={store}>
        <MyExpense />
      </Provider>
    );
    const MedicineElement = screen.getByText("Medicine");
    expect(MedicineElement).toBeInTheDocument();
  });
  test("renders Fashion as a text", () => {
    render(
      <Provider store={store}>
        <MyExpense />
      </Provider>
    );
    const FashionElement = screen.getByText("Fashion");
    expect(FashionElement).toBeInTheDocument();
  });
  test("renders description as a text", () => {
    render(
      <Provider store={store}>
        <MyExpense />
      </Provider>
    );
    const DescriptionElement = screen.getByText("Description :");
    expect(DescriptionElement).toBeInTheDocument();
  });
});
