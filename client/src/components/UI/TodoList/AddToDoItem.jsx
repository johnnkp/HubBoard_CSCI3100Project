import React from "react";
import { Card, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";

const AddToDoItem = () => {
  const formik = useFormik({
    initialValues: {
      todoTitle: "",
      todoDeatils: "",
    },
    onSubmit: (values, action) => {
      alert(JSON.stringify(values, null, 2));
      action.resetForm();
    },
  });

  return (
    <Card
      component="form"
      onSubmit={formik.handleSubmit}
      variant="outlined"
      sx={{
        paddingX: 4,
        paddingY: 2,
        boxShadow: (theme) => `0px 0px 15px -5px ${theme.palette.hOrange.main}`,
      }}
    >
      <Stack gap={2}>
        <TextField
          id="todoTitle"
          name="todoTitle"
          type="text"
          variant="standard"
          color="hOrange"
          placeholder="Add new to-do goal!"
          onChange={formik.handleChange}
          value={formik.values.todoTitle}
        />
        <TextField
          id="todoDeatils"
          name="todoDeatils"
          type="text"
          color="hOrange"
          placeholder="details..."
          multiline
          rows={3}
          onChange={formik.handleChange}
          value={formik.values.todoDeatils}
        />
        <button type="submit">Submit</button>
      </Stack>
    </Card>
  );
};

export default AddToDoItem;
