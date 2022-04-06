import React from "react";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const SearchResultList = ({ results }) => {
  const sendFriendRequest = async (e) => {
    console.log(e.currentTarget.value);
    try {
      const res = await axios.post("/api/user/interaction/friendRequest", {
        targetUsername: e.currentTarget.value,
      });
      console.log(res);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <List
      sx={{
        color: "white",
        bgcolor: "orange",
        borderRadius: 2,
        minWidth: 268,
        maxWidth: 360,
        position: "absolute",
        transformOrigin: "top",
        top: "100%",
        zIndex: (theme) => theme.zIndex.appbar + 1,
        overflow: "hidden",
      }}
    >
      {results.length > 0 ? (
        results.map((result) => (
          <ListItem
            key={result._id}
            secondaryAction={
              <IconButton
                edge="end"
                onClick={sendFriendRequest}
                value={result.username}
              >
                <AddIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>{result.username}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={result.username} />
          </ListItem>
        ))
      ) : (
        <ListItem>
          <ListItemText primary="No result found" />
        </ListItem>
      )}
    </List>
  );
};

export default SearchResultList;
