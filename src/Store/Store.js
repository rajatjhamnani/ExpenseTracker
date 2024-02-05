import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./AuthRedux";
import { profileDataSlice } from "./ProfileDataRedux";
const store = configureStore({
  reducer: { auth: authSlice.reducer, profile: profileDataSlice.reducer },
});

export default store;
