import React from "react";
import { Typography, Link } from "@mui/material";

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.seconday" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/">
        HubBoard
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
};

export default Copyright;
