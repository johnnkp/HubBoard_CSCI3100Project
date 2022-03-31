import React from "react";
import {
  Box,
  Card,
  Checkbox,
  Stack,
  TextField,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { useDispatch } from "react-redux";
import { todoListActions } from "../../../store/slice/todo";

const AddToDoItem = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      todoTitle: "",
      todoDetails: "",
      isPin: false,
      isTodoList: true,
    },
    onSubmit: async (values, action) => {
      try {
        const res = await axios.post("/api/user/todolist/createTodolist", {
          title: values.todoTitle,
          description: values.todoDetails,
        });
        console.log(res);
        if (res.data.success) {
          dispatch(todoListActions.pushOne(res.data.todolist));
        }
        action.resetForm();
      } catch (err) {
        console.log(err.response);
      }
    },
  });

  return (
    <Card
      component="form"
      onSubmit={formik.handleSubmit}
      variant="outlined"
      sx={{
        padding: 2,
        borderRadius: 5,
        borderColor: "hOrange.main",
        borderWidth: 2,
        // boxShadow: (theme) => `0px 0px 15px -5px ${theme.palette.hOrange.main}`,
      }}
    >
      <Stack>
        <Stack direction="row" display="flex" justifyContent="space-between">
          <TextField
            id="todoTitle"
            name="todoTitle"
            type="text"
            fullWidth
            variant="standard"
            color="hOrange"
            placeholder="Add new to-do goal!"
            onChange={formik.handleChange}
            value={formik.values.todoTitle}
          />
          <Checkbox
            color="hOrange"
            icon={<PushPinOutlinedIcon />}
            checkedIcon={<PushPinIcon />}
            id="isPin"
            name="isPin"
            onChange={formik.handleChange}
            value={formik.values.isPin}
            checked={formik.values.isPin}
          />
        </Stack>
        <TextField
          id="todoDetails"
          name="todoDetails"
          type="text"
          color="hOrange"
          placeholder="details..."
          multiline
          rows={3}
          onChange={formik.handleChange}
          value={formik.values.todoDetails}
        />
        <Stack direction="row" display="flex" justifyContent="space-between">
          <Box>
            <Checkbox
              color="hOrange"
              id="isTodoList"
              name="isTodoList"
              onChange={formik.handleChange}
              value={formik.values.isTodoList}
              checked={formik.values.isTodoList}
            />
          </Box>
          <IconButton color="hOrange" type="submit">
            <AddCircleIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
};

export default AddToDoItem;
