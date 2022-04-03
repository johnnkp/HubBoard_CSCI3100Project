import React from "react";
import {MainLayout} from "../../../components/Layout";
import {Button, Grid, Stack} from "@mui/material";
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';

const router = require('express').Router();

const notesGet = () => {
  router.get('https://keep.googleapis.com/v1/{name=notes/*}', (req, res) => {

  });
};

const Syncpage = () => {
  return (
    <MainLayout profilepage={false}>
      <Grid container justifyContent="center">
        <Stack height={window.innerHeight - 100} justifyContent="space-evenly" minWidth="50vw" maxWidth="60vw">
          <Button
            sx={{boxShadow: 1}}
            size="large"
            color="hOrange"
            startIcon={<CloudDownloadRoundedIcon/>}
            variant="outlined"
          >
            import
          </Button>

          <Button
            sx={{boxShadow: 1}}
            size="large"
            color="hOrange"
            startIcon={<CloudUploadRoundedIcon/>}
            variant="outlined"
          >
            export
          </Button>
        </Stack>
      </Grid>
    </MainLayout>
  );
};

export default Syncpage;
