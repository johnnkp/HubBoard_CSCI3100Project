import React from "react";
import { Box, Typography, Button } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

// INFO: commonly used return to homepage component
const ReturnToHome = (props) => {
  return (
    <React.Fragment>
      <Box
        display="flex"
        height="100vh"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography fontSize="1.5em">{props.children}</Typography>
        <Button to="/" LinkComponent={RouterLink} color="hOrange">
          Return to homepage
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default ReturnToHome;
