import React, {useEffect, useState} from "react";
import {AppBar, Toolbar, Box, Typography, IconButton} from "@mui/material";
import axios from "axios";
import {DropDownMenu} from "../";
import classes from "../../../styles/global.module.css";
import HuboardIcon from "../../../image/HubBoard.svg";
import menuIcon from "../../../image/ic_menu_en.svg";

// INFO: actual page need to set navigation
const pages = ["Profile", "Dashboard", "Setting", "Logout"];

const Navbar = (props) => {
  const [profilePhoto, setProfilePhoto] = useState();

  // INFO: get user profile photo on component mount
  useEffect(() => {
    const getUserProfilePic = async () => {
      try {
        const res = await axios.get("/api/user/profilePhoto", {
          responseType: "blob",
        });
        setProfilePhoto(URL.createObjectURL(res.data));
      } catch (err) {
        console.log(err.response);
      }
    };
    getUserProfilePic();
  }, []);

  return (
    <AppBar
      position="sticky"
      color="hOrange"
      sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
    >
      <Toolbar sx={{px: ["0.7%", "0.7%"]}}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            minWidth="230px"
          >
            <IconButton
              color="inherit"
              onClick={props.handleDrawerToggle}
              sx={{display: "block"}}
            >
              <img src={menuIcon} className={classes.w3_svg_white} height="45vw" alt="Menu" title="Menu"/>
            </IconButton>
            <img src={HuboardIcon} height="50px" alt="HubBoard" title="HubBoard"/>
            <Typography variant="h5">HubBoard</Typography>
          </Box>
          {props.ToolbarButton ?
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-evenly"
              minWidth="150px"
            >
              <Typography>Toolbar</Typography>
              <DropDownMenu profilePhoto={profilePhoto} pages={pages}/>
            </Box> :
            <DropDownMenu profilePhoto={profilePhoto} pages={pages}/>
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
