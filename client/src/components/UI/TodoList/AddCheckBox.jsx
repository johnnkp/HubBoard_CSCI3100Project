import React, { useState } from "react";
import { Button, Grid, IconButton, Popover, TextField } from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircle";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { todoListActions } from "../../../store/slice/todo";

const AddCheckBox = (props) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const formik = useFormik({
    initialValues: {
      checkboxContent: "",
    },
    onSubmit: async (values, actions) => {
      try {
        const res = await axios.post(
          "/api/user/todolist/checkbox/createCheckbox",
          {
            todolistId: props.todolistId,
            checkboxContent: values.checkboxContent,
          }
        );
        if (res.data.success) {
          dispatch(todoListActions.renewCheckBox(res.data.todolist));
        }
        setAnchorEl(null);
      } catch (err) {
        console.log(err.response);
      }
    },
  });

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton color="hOrange" onClick={handleClick}>
        <AddCircle />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Grid
          container
          p={2}
          spacing={2}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Check Box Content"
              type="text"
              id="checkboxContent"
              name="checkboxContent"
              value={formik.values.checkboxContent}
              onChange={formik.handleChange}
              error={
                formik.touched.checkboxContent &&
                Boolean(formik.errors.checkboxContent)
              }
              helperText={
                formik.touched.checkboxContent && formik.errors.checkboxContent
              }
            />
          </Grid>
          <Grid item xs={12} textAlign="right">
            <Button variant="contained" color="hOrange" type="submit">
              Add
            </Button>
          </Grid>
        </Grid>
      </Popover>
    </React.Fragment>
  );
};

export default AddCheckBox;
