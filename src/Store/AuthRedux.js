import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = {
  userIsLoggedIn: false,
  userId: null,
  token: null,
};
export const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("idToken", action.payload[0]);
      localStorage.setItem("email", action.payload[1]);
      console.log(action.payload);
      state.userIsLoggedIn = true;
      state.token = action.payload[0];
      state.userId = action.payload[1];
    },
    logout: (state, action) => {
      localStorage.removeItem("idToken");
      localStorage.removeItem("email");
      state.userIsLoggedIn = false;
      state.token = null;
      state.userId = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
