import React, {useState} from "react";
import {Wrapper} from "../Helpers";
import {Navbar, SideBar} from "../UI";
import {Box, CssBaseline} from "@mui/material";

// INFO: Mainpage layout
const MainLayout = ({children, profilepage}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Wrapper>
      <CssBaseline/>
      <Navbar handleDrawerToggle={handleDrawerToggle} ToolbarButton={!profilepage}/>
      <Box display="flex">
        <SideBar
          drawerOpen={drawerOpen}
          handleDrawerToggle={handleDrawerToggle}
          profilepage={profilepage}
        />
        <Box component="main" sx={{flexGrow: 1}}>
          {children}
        </Box>
      </Box>
    </Wrapper>
  );
};

export default MainLayout;
