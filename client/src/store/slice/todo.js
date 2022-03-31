import { createSlice } from "@reduxjs/toolkit";

const todoListSlice = createSlice({
  name: "todoList",
  initialState: { todolists: [] },
  reducers: {
    setTodoList: (state, action) => {
      state.todolists = action.payload;
    },
    pushOne: (state, action) => {
      state.todolists = [...state.todolists, action.payload];
    },
    renewCheckBox: (state, action) => {
      state.todolists.forEach((todolist, i) => {
        if (todolist._id === action.payload._id) {
          state.todolists[i] = { ...action.payload };
        }
      });
    },
    updateComment: (state, action) => {},
  },
});

export const todoListActions = todoListSlice.actions;
export default todoListSlice.reducer;
