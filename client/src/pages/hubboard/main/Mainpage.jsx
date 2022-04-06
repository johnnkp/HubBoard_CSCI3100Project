import React from "react";
import { MainLayout } from "../../../components/Layout";
import { Todo } from "../../../components/UI";

const Mainpage = () => {
  return (
    <MainLayout profilepage={false}>
      <Todo />
    </MainLayout>
  );
};

export default Mainpage;
