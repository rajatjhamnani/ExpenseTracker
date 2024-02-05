import { createSlice } from "@reduxjs/toolkit";

const initialPofileState = {
  userData: [],
};

export const profileDataSlice = createSlice({
  name: "updateProfile",
  initialState: initialPofileState,
  reducers: {
    profileData: (state, action) => {
      state.userData = action.payload;
    },
  },
});
export const { profileData } = profileDataSlice.actions;
export default profileDataSlice.reducer;
