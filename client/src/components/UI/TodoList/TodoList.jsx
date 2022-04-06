import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import CheckBoxList from "./CheckBoxList";
import AddCheckBox from "./AddCheckBox";
import CommentBox from "./CommentBox";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "@mui/icons-material";
import AddContributor from "./AddContributor";
import axios from "axios";
import { todoListActions } from "../../../store/slice/todo";

const TodoList = () => {
  const { todolists } = useSelector((state) => state.todolists);
  const dispatch = useDispatch();

  const deleteTodolist = async (e) => {
    const todolistId = e.currentTarget.getAttribute("data-todolistid");
    try {
      const res = await axios.delete("/api/user/todolist/deleteTodolist", {
        data: { todolistId },
      });
      console.log(res);
      if (res.data.success) {
        dispatch(todoListActions.deleteTodolist({ _id: todolistId }));
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  if (todolists.length > 0) {
    return todolists.map((todolist) => (
      <Card
        key={todolist._id}
        variant="outlined"
        sx={{
          width: "80%",
          margin: 2,
          borderColor: "hOrange.main",
          borderWidth: 2,
        }}
      >
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h1" fontSize="2em" my={2}>
              {todolist.title}
            </Typography>
            <IconButton
              color="hOrange"
              onClick={deleteTodolist}
              data-todolistid={todolist._id}
            >
              <Close />
            </IconButton>
          </Box>
          <Divider />
          {todolist.description && (
            <React.Fragment>
              <Typography variant="h2" fontSize="1.25em" my={1}>
                {todolist.description}
              </Typography>
              <Divider />
            </React.Fragment>
          )}
          <CheckBoxList todolist={todolist} />
        </CardContent>
        <CardActions>
          <AddCheckBox todolistId={todolist._id} />
          <CommentBox todolist={todolist} />
          <AddContributor todolistId={todolist._id} />
        </CardActions>
      </Card>
    ));
  }
  return null;
};

export default TodoList;
