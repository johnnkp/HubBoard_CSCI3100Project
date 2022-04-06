import React, { useEffect, useState } from "react";
import { IconButton, Badge, Popover } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationList from "./NotificationList";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../../store/slice/notification";

const Notification = ({ socket }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notificationLists.notifications
  );

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    socket.on("notifications", (notifications) => {
      // console.log("recieve notification")          setNotifications={setNotifications};
      dispatch(notificationActions.setNotifications(notifications));
    });
  }, [socket]);

  return (
    <React.Fragment>
      <IconButton sx={{ color: "white" }} onClick={handleOpen}>
        <Badge badgeContent={notifications.length} color="info">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <NotificationList socket={socket} />
      </Popover>
    </React.Fragment>
  );
};

export default Notification;
