import React from "react";
import { Outlet } from "react-router-dom";

const HubboardMain = (props) => {
  const isAuthenticated = props?.isAuthenticated;
  // console.log(isAuthenticated);
  if (isAuthenticated) {
    return <Outlet />;
  }
  return <h1>You are not login</h1>;
};

export default HubboardMain;
