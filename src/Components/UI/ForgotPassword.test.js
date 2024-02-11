import { render, screen } from "@testing-library/react";
import ForgotPassword from "./ForgotPassword";
test("renders forgot password as a text", () => {
  render(<ForgotPassword />);
  const forgotPasswordElement = screen.getByText("Forgot Password");
  expect(forgotPasswordElement).toBeInTheDocument();
});
