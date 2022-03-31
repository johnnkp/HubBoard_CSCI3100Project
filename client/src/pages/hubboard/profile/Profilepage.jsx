import React from "react";
import { MainLayout } from "../../../components/Layout";
import ProfileDetails from "./ProfileDetails";

const Profilepage = () => {
  return (
    <MainLayout profilepage={true}>
      <ProfileDetails />
    </MainLayout>
  );
};

export default Profilepage;
