import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  userIsLoggedIn: !!localStorage.getItem("authToken"),
  userId: localStorage.getItem("email"),
  token: localStorage.getItem("authToken"),
};
export const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("authToken", action.payload[0]);
      localStorage.setItem("email", action.payload[1]);
      state.userIsLoggedIn = true;
      state.token = action.payload[0];
      state.userId = action.payload[1];
    },
    logout: (state, action) => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("email");
      state.userIsLoggedIn = false;
      state.token = null;
      state.userId = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
