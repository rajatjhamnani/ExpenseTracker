import { render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import store from "../../Store/Store";
import ProfileDetails from "./Profile";

test("renders Profiles as a text", () => {
  render(
    <Provider store={store}>
      <ProfileDetails />
    </Provider>
  );
  const ProfilesElement = screen.getByText("Profiles");
  expect(ProfilesElement).toBeInTheDocument();
});
