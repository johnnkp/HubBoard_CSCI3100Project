import { createSlice } from "@reduxjs/toolkit";

const todoListSlice = createSlice({
  name: "todoList",
  initialState: { todoList: [] },
  reducers: {
    setTodoList: (state, action) => {
      state.todoList = action.payload;
    },
  },
});

export const todoListActions = todoListSlice.actions;
export default todoListSlice.reducer;
