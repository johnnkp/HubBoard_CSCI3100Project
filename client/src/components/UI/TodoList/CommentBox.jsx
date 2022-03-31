import { Popover, IconButton } from "@mui/material";
import React, { useState } from "react";
import TodoListComment from "./TodoListComment";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const CommentBox = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton color="hOrange" onClick={handleClick}>
        <ChatBubbleIcon />
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
        <TodoListComment todolist={props.todolist} />
      </Popover>
    </React.Fragment>
  );
};

export default CommentBox;
