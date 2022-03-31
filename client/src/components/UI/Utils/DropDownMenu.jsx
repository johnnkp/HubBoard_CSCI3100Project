import React, { useState } from "react";
import { Wrapper } from "../../Helpers";
import {
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { MenuRounded } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/slice/auth";

const DropDownMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenUserMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/user/logout");
      if (res.data.success) {
        dispatch(authActions.logout());
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <Wrapper>
      <Tooltip title="Open user menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {props.profilePhoto ? (
            <Avatar alt="User Menu" src={props.profilePhoto} />
          ) : (
            <MenuRounded sx={{ color: "white" }} />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorEl)}
        onClose={handleCloseUserMenu}
      >
        {props.pages.map((page) => (
          <MenuItem key={page} component={RouterLink} to={`/hubboard/${page}`}>
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
        ))}
        <MenuItem key="logout">
          <Typography textAlign="center" onClick={handleLogout}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Wrapper>
  );
};

export default DropDownMenu;
