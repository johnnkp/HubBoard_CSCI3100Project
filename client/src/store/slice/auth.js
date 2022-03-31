import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authenticate",
  initialState: { isAuthenticated: false, useremail: null },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
    },
    logout(state, action) {
      state.isAuthenticated = false;
    },
    googleLogin(state, action) {
      state.useremail = action.payload.useremail;
    },
  },
});

// INFO: export auth action and reducer
export const authActions = authSlice.actions;
export default authSlice.reducer;
