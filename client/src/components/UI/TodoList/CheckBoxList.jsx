import React from "react";
import {
  List,
  ListItem,
  Checkbox,
  Box,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import { Delete, Favorite, FavoriteBorder } from "@mui/icons-material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { todoListActions } from "../../../store/slice/todo";

const CheckBoxList = (props) => {
  const dispatch = useDispatch();
  const todolist = props.todolist;
  const { checkboxes } = todolist;

  const updateCheckbox = async (e) => {
    try {
      const res = await axios.put(
        "/api/user/todolist/checkbox/updateCheckbox",
        {
          todolistId: todolist._id,
          checkboxId: e.target.id,
          isChecked: e.target.checked,
        }
      );
      if (res.data.success) {
        dispatch(todoListActions.renewCheckBox(res.data.todolist));
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const deleteCheckBox = async (e) => {
    try {
      const res = await axios.delete(
        "/api/user/todolist/checkbox/deleteCheckbox",
        {
          data: { todolistId: todolist._id, checkboxId: e.currentTarget.value },
        }
      );
      if (res.data.success) {
        dispatch(todoListActions.renewCheckBox(res.data.todolist));
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <List dense>
      {checkboxes.map((checkbox, i) => (
        <ListItem
          key={i}
          secondaryAction={
            <Box>
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                edge="end"
              />
              <IconButton
                color="hOrange"
                onClick={deleteCheckBox}
                value={checkbox._id}
              >
                <Delete />
              </IconButton>
            </Box>
          }
        >
          <ListItemText>
            <Box display="flex" alignItems="center">
              <Checkbox
                onChange={updateCheckbox}
                id={checkbox._id}
                checked={checkbox.isChecked}
              />
              <Typography
                sx={{
                  textDecoration: checkbox.isChecked ? "line-through" : "none",
                }}
              >
                {checkbox.content}
              </Typography>
            </Box>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default CheckBoxList;
