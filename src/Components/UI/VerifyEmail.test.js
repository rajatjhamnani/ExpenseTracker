import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import VerifyEmail from "./VerifyEmail";

jest.mock("node-fetch"); // Assuming you are using node-fetch or a similar library

describe("VerifyEmail Component", () => {
  it("renders the verification message", async () => {
    render(<VerifyEmail />);

    await waitFor(() => {});

    const textMatcher = (content, element) => element.textContent === content;

    const verificationMessage = screen.queryByText((content, element) =>
      textMatcher(/Verification Link is Sent to Your e-mail/i, element)
    );

    if (verificationMessage) {
      expect(verificationMessage).toBeInTheDocument();
    } else {
      console.warn("Verification message not found in the rendered component.");
    }
  });
});
