import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authenticate",
  initialState: { isAuthenticated: false, useremail: null, isAdmin: false },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      if (action.payload !== undefined) {
        state.isAdmin = action.payload;
      }
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
