import React, { useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { commentActions } from "../../../store/slice/comment";

const TodoListComment = (props) => {
  const dispatch = useDispatch();
  const todolist = props.todolist;

  const { _id: todolistId } = todolist;
  // console.log(todolistId);

  useEffect(() => {
    const getAllComments = async () => {
      try {
        const res = await axios.get(
          `/api/user/todolist/getAllComments/${todolistId}`
        );
        if (res.data.success) {
          dispatch(commentActions.setComments(res.data.comments));
        }
      } catch (err) {
        console.log(err.response);
      }
    };
    getAllComments();
  }, [todolistId]);

  const comments = useSelector((state) => state.commentLists.comments);

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: async (values, action) => {
      try {
        const res = await axios.post("/api/user/todolist/comment/addComment", {
          todolistId: todolist._id,
          content: values.content,
        });
        console.log(res);
        if (res.data.success) {
          dispatch(commentActions.renewComment(res.data.comment));
          action.resetForm();
        }
      } catch (err) {
        console.log(err.response);
      }
    },
  });

  return (
    <Box width="100%" p={2}>
      <Typography>Comments</Typography>
      <List p={2} dense sx={{ maxHeight: 400, overflow: "auto" }}>
        {comments.length > 0 ? (
          comments.map((comment) => {
            const time = new Date(comment.time).toLocaleString();
            return (
              <Box key={comment._id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Box display="flex" justifyContent="space-between">
                          <Typography color="primary">
                            {comment.sender.username}
                          </Typography>
                          <Typography>{time}</Typography>
                        </Box>
                        <Typography>{comment.content}</Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider />
              </Box>
            );
          })
        ) : (
          <Typography>No comments yet...</Typography>
        )}
      </List>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        mt={4}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          placeholder="Comment here!"
          id="content"
          name="content"
          type="text"
          value={formik.values.content}
          onChange={formik.handleChange}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
        />
        <Button variant="contained" color="hOrange" type="submit">
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default TodoListComment;
