import React from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, TextField, Typography} from "@mui/material";
import * as Yup from "yup";
import {useFormik} from "formik";
import axios from "axios";
import {MainLayout} from "../../../components/Layout";

const validationSchema = Yup.object({
  oldPassword: Yup.string("Enter your old password")
    .min(6, "old password should be of minimum 6 characters")
    .required("old password is required"),
  newPassword: Yup.string("Enter your new password")
    .min(6, "new password should be of minimum 6 characters")
    .required("new password is required"),
});

const ChangePasswordpage = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const res = await axios.put("/api/user/passwordModify", values);
        if (res.data.success) {
          alert("Password changed, please login again...");
          navigate("/");
        }
      } catch (err) {
        alert(err.response.data.message);
        actions.resetForm();
      }
    },
  });

  return (
    <MainLayout profilepage={true}>
      <Box
        gap={4}
        component="form"
        display="grid"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={4}
        onSubmit={formik.handleSubmit}
      >
        <Box>
          <Typography color="hOrange.main" fontSize="1.5em">
            Please enter the old password
          </Typography>
          <TextField
            required
            fullWidth
            id="oldPassword"
            name="oldPassword"
            label="old password"
            type="password"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
            }
          />
        </Box>
        <Box>
          <Typography color="hOrange.main" fontSize="1.5em">
            Please enter the new password
          </Typography>
          <TextField
            required
            fullWidth
            id="newPassword"
            name="newPassword"
            label="new password"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
          />
        </Box>
        <Button type="submit" color="hOrange" variant="contained" fullWidth>
          Change Password
        </Button>
      </Box>
    </MainLayout>
  );
};

export default ChangePasswordpage;
