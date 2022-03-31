import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: { comments: [] },
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    renewComment: (state, action) => {
      state.comments = [...state.comments, action.payload];
    },
  },
});

export const commentActions = commentSlice.actions;
export default commentSlice.reducer;
