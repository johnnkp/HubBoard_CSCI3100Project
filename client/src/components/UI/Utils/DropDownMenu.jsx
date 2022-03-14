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
import { Link as RouterLink } from "react-router-dom";

const DropDownMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenUserMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
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
          <MenuItem key={page} component={RouterLink} to={page}>
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Wrapper>
  );
};

export default DropDownMenu;
