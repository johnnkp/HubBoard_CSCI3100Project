import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  EventNoteRounded,
  TagRounded,
  SyncRounded,
  MenuRounded,
} from "@mui/icons-material";
import React from "react";
import { Wrapper } from "../../Helpers";

// INFO: width for the sidebar
const sidebarWidth = 240;
// INFO: Icon array easy for index access
const icon = [<EventNoteRounded />, <TagRounded />, <SyncRounded />];

const SideBar = (props) => {
  return (
    <Box>
      <Drawer
        sx={{
          width: sidebarWidth,
          display: ['block', 'none'],
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: sidebarWidth,
            boxSizing: "border-box",
          },
        }}
        ModalProps={{ keepMounted: true }}
        open={props.drawerOpen}
        onClose={props.handleDrawerOpen}
        variant="temporary"
        anchor="left"
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Note", "Tag", "Sync"].map((text, index) => (
              <ListItemButton key={text} sx={{ color: "hOrange.main" }}>
                <ListItemIcon sx={{ color: "hOrange.main" }}>
                  {icon[index]}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: "black" }} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
      <Drawer
        sx={{
          width: sidebarWidth,
          display: ['none', 'block'],
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: sidebarWidth,
            boxSizing: "border-box",
          },
        }}
        ModalProps={{ keepMounted: true }}
        open={props.drawerOpen}
        onClose={props.handleDrawerOpen}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Note", "Tag", "Sync"].map((text, index) => (
              <ListItemButton key={text} sx={{ color: "hOrange.main" }}>
                <ListItemIcon sx={{ color: "hOrange.main" }}>
                  {icon[index]}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: "black" }} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideBar;
