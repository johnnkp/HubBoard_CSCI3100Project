import React, { useState } from "react";
import {
  IconButton,
  Popover,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { SettingsRounded } from "@mui/icons-material";
import { useFormik } from "formik";
import axios from "axios";

const SimplePopover = ({ user }) => {
  const formik = useFormik({
    initialValues: {
      username: user.username,
      newPassword: "",
    },
    onSubmit: async (values, actions) => {
      try {
        const res = await axios.put("/api/admin/resetUserPassword", {
          username: values.username,
          newPassword: values.newPassword,
        });
        alert("User password have been changed");
        actions.resetForm();
      } catch (err) {
        console.log(err.response);
      }
    },
  });

  const [anchoEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton
        edge="end"
        color="hOrange"
        data-username={user.username}
        onClick={handleClick}
      >
        <SettingsRounded />
      </IconButton>
      <Popover
        open={Boolean(anchoEl)}
        anchorEl={anchoEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          p={2}
          display="grid"
          sx={{
            gap: 1,
          }}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Typography fontSize="1.3em">
            Resetting {user.username} password
          </Typography>
          <TextField
            placeholder="new password"
            required
            fullWidth
            id="newPassword"
            name="newPassword"
            type="password"
            value={formik.values.newPassword}
            data-username={user.username}
            onChange={formik.handleChange}
          />
          <Button type="submit" color="hOrange" variant="contained">
            Change password
          </Button>
        </Box>
      </Popover>
    </React.Fragment>
  );
};

export default SimplePopover;
