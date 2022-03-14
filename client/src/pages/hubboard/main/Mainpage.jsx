import React, { useEffect } from "react";
import { MainLayout } from "../../../components/Layout";
import { Todo } from "../../../components/UI";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../../store/slice/auth";
import { todoListActions } from "../../../store/slice/todo";

const Mainpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // INFO: dummy testing todo item by fake api
  useEffect(() => {
    const getTodoItems = async () => {
      try {
        // INFO: dummy todo item api to test
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        dispatch(todoListActions.setTodoList(res.data));
      } catch (err) {
        console.log(err.response);
      }
    };
    getTodoItems();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/user/logout");
      if (res.data.success) {
        dispatch(authActions.logout());
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <MainLayout>
      <Todo />
      <button onClick={handleLogout}>logout</button>
    </MainLayout>
  );
};

export default Mainpage;
