import {PhotoCamera} from "@mui/icons-material";
import {Avatar, Grid, IconButton, Paper, Typography} from "@mui/material";
import {Box, styled} from "@mui/system";
import axios from "axios";
import React, {useEffect, useState} from "react";

const Input = styled("input")({
  display: "none",
});

const ProfileDetails = () => {
  const [userInfo, setUserInfo] = useState({username: "", email: ""});
  const [userPic, setUserPic] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios.get("/api/user/info");
        if (res.data.success) {
          setUserInfo({username: res.data.username, email: res.data.email});
        }
      } catch (err) {
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    const getUserProfilePic = async () => {
      try {
        const res = await axios.get("/api/user/profilePhoto", {
          responseType: "blob",
        });
        setUserPic(URL.createObjectURL(res.data));
      } catch (err) {
        console.log(err.response);
      }
    };
    getUserProfilePic();
  }, []);

  const uploadFile = async (e) => {
    const fd = new FormData();
    fd.append("profilePhoto", e.target.files[0]);
    try {
      const res = await axios.put("/api/user/profilePhoto", fd, {
        headers: {
          "Content-type":
            "multipart/form-data; boundary=" + new Date().getTime(),
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <Grid container gap={2} m={4} maxWidth="75vw">
      <Grid
        container
        item
        xs={4}
        display="flex"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography fontSize="1.5em">
            Account Name:
          </Typography>
        </Grid>
        <Grid item>
          <Paper
            sx={{
              backgroundColor: "orange",
              paddingX: 1,
            }}
          >
            <Typography fontSize="1.5em" color="white">
              {userInfo.username}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={6}
        display="flex"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <Typography fontSize="1.5em">
            Email:
          </Typography>
        </Grid>
        <Grid item>
          <Paper
            sx={{
              backgroundColor: "orange",
              paddingX: 1,
            }}
          >
            <Typography fontSize="1.5em" color="white">
              {userInfo.email}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" component="form">
          <Typography fontSize="1.5em">
            Profile Picture: &nbsp;
          </Typography>
          <Avatar
            src={userPic}
            alt="user profile picture"
            sx={{width: 150, height: 150}}
          />
          <label htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={uploadFile}
            />
            <IconButton
              color="hOrange"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera/>
            </IconButton>
          </label>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfileDetails;
