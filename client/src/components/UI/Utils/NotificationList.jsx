import React from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { CloseRounded, DoneRounded } from "@mui/icons-material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../../store/slice/notification";

const NotificationList = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notificationLists.notifications
  );

  const handleAcceptFriend = async (e) => {
    const requestId = e.currentTarget.getAttribute("data-requestid");
    const isAccepted =
      e.currentTarget.getAttribute("data-isaccepted") === "true";
    const notificationId = e.currentTarget.getAttribute("data-notificationid");
    try {
      const res = await axios.post(
        "/api/user/interaction/friendRequestResponse",
        {
          requestId,
          isAccepted,
        }
      );
      if (res.data.success) {
        dispatch(notificationActions.renewNotifications(notificationId));
      }
      // console.log(res);
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleAcceptContributor = async (e) => {
    const requestId = e.currentTarget.getAttribute("data-requestid");
    const isAccepted =
      e.currentTarget.getAttribute("data-isaccepted") === "true";
    const notificationId = e.currentTarget.getAttribute("data-notificationid");
    try {
      const res = await axios.post(
        "/api/user/todolist/contributor/contributorRequestResponse",
        {
          requestId,
          isAccepted,
        }
      );
      // console.log(res);
      if (res.data.success) {
        dispatch(notificationActions.renewNotifications(notificationId));
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  // console.log(notifications);

  return (
    <List sx={{ minWidth: 400 }}>
      {notifications.length > 0 ? (
        notifications.map((notification) => {
          const time = new Date(notification.time);
          if (notification.__t === "FriendRequestNotification") {
            return (
              <ListItem
                key={notification?._id}
                sx={{
                  borderBottom: (theme) =>
                    `solid ${theme.palette.hOrange.main}`,
                }}
                secondaryAction={
                  <React.Fragment>
                    <Box>
                      <Box
                        onClick={handleAcceptFriend}
                        data-isaccepted={true}
                        data-requestid={notification.content?._id}
                        data-notificationid={notification._id}
                      >
                        <IconButton edge="end" color="hOrange">
                          <DoneRounded />
                        </IconButton>
                      </Box>
                      <Box
                        onClick={handleAcceptFriend}
                        data-isaccepted={false}
                        data-requestid={notification.content?._id}
                        data-notificationid={notification._id}
                      >
                        <IconButton edge="end" color="hOrange">
                          <CloseRounded />
                        </IconButton>
                      </Box>
                    </Box>
                  </React.Fragment>
                }
              >
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography>A friend invitation from</Typography>
                      <Typography variant="h5" color="primary">
                        {notification.content?.fromUser.username}
                      </Typography>
                      <Typography>{time.toLocaleString()}</Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            );
          } else if (notification.__t === "FriendRequestResponseNotification") {
            return (
              <ListItem
                key={notification?._id}
                sx={{
                  borderBottom: (theme) =>
                    `solid ${theme.palette.hOrange.main}`,
                }}
              >
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Box display="flex">
                        <Typography color="primary">
                          {notification.content?.fromUser.username}
                        </Typography>
                        <Typography>
                          &nbsp;
                          {notification.content.isAccepted
                            ? "accept the friend request"
                            : "reject the friend request"}
                        </Typography>
                      </Box>
                      <Typography>{time.toLocaleString()}</Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            );
          } else if (notification.__t === "ContributorRequestNotification") {
            return (
              <ListItem
                key={notification?._id}
                sx={{
                  borderBottom: (theme) =>
                    `solid ${theme.palette.hOrange.main}`,
                }}
                secondaryAction={
                  <React.Fragment>
                    <Box>
                      <Box
                        onClick={handleAcceptContributor}
                        data-isaccepted={true}
                        data-requestid={notification.content?._id}
                        data-notificationid={notification._id}
                      >
                        <IconButton edge="end" color="hOrange">
                          <DoneRounded />
                        </IconButton>
                      </Box>
                      <Box
                        onClick={handleAcceptContributor}
                        data-isaccepted={false}
                        data-requestid={notification.content?._id}
                        data-notificationid={notification._id}
                      >
                        <IconButton edge="end" color="hOrange">
                          <CloseRounded />
                        </IconButton>
                      </Box>
                    </Box>
                  </React.Fragment>
                }
              >
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography>A contributor invitaion from</Typography>
                      <Typography variant="h5" color="primary">
                        {notification.content?.fromUser.username}
                      </Typography>
                      <Typography>{time.toLocaleString()}</Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            );
          } else if (
            notification.__t === "ContributorRequestResponseNotification"
          ) {
            return (
              <ListItem
                key={notification?._id}
                sx={{
                  borderBottom: (theme) =>
                    `solid ${theme.palette.hOrange.main}`,
                }}
              >
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Box display="flex">
                        <Typography color="primary">
                          {notification.content?.fromUser.username}
                        </Typography>
                        <Typography>
                          &nbsp;
                          {notification.content.isAccepted
                            ? "accept the contributor request"
                            : "reject the contributor request"}
                        </Typography>
                      </Box>
                      <Typography>{time.toLocaleString()}</Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            );
          }
        })
      ) : (
        <Typography textAlign="center">No Notification yet</Typography>
      )}
    </List>
  );
};

export default NotificationList;
