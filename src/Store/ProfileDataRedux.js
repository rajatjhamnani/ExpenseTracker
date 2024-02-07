import { createSlice } from "@reduxjs/toolkit";

const initialPofileState = {
  userData: [],
  darkTheme: true,
};

export const profileDataSlice = createSlice({
  name: "updateProfile",
  initialState: initialPofileState,
  reducers: {
    profileData: (state, action) => {
      state.userData = action.payload;
    },
    changeTheme: (state, action) => {
      state.darkTheme = action.payload;
      console.log(state.darkTheme);
    },
  },
});
export const { profileData, changeTheme } = profileDataSlice.actions;
export default profileDataSlice.reducer;
