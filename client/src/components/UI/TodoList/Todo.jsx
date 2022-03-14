import React from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import AddToDoItem from "./AddToDoItem"
import TodoItem from "./TodoItem"

const TodoItems = () => {
  const { todoList } = useSelector((state) => state.todoList);

  return (
    <Grid container justifyContent="center" my={8}>
      <Grid item container xs={12}>
        <Grid item xs={0} sm={1} md={3} />
        <Grid item xs={12} sm={10} md={6}>
          <AddToDoItem/>
        </Grid>
        <Grid item xs={0} sm={1} md={3}/>
      </Grid>
      <Grid item container xs={12}>
        <TodoItem todoList={todoList}/>
      </Grid>
    </Grid>
  );
};

export default TodoItems;
