import {useState} from "react";
import {Box, CssBaseline} from "@mui/material";
import {Wrapper} from "../../../components/Helpers";
import {Navbar, SideBar} from "../../../components/UI";

const Profile = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Wrapper>
      <CssBaseline/>
      <Navbar handleDrawerToggle={handleDrawerToggle} ToolbarButton={false}/>
      <Box display="flex">
        <SideBar drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} items="account"/>
        <Box component="main" sx={{flexGrow: 1}}>
          <h1>You in profile page</h1>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Profile;
