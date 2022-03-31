import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { notifications: [] },
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    pushOne: (state, action) => {
      state.notifications = [...state.notifications, action.payload];
    },
    renewNotifications: (state, action) => {
      state.notifications = state.notifications.filter((notification) => {
        if (notification._id !== action.payload) {
          return notification;
        }
      });
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
