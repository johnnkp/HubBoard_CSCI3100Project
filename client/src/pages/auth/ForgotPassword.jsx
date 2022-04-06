import React from "react";
import { ResendEmail } from "../../components/Helpers";
import axios from "axios";

const ForgotPassword = () => {
  // INFO: custom submit handler
  const resendForgotPasswordEmail = async (values, action) => {
    try {
      const res = await axios.post("/api/auth/resetPasswordEmail", values);
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  };

  // INFO: operation type = 2
  return (
    <ResendEmail resendEmailHandler={resendForgotPasswordEmail} type={2}>
      Forgot password email has been sent. Please check your email again.
    </ResendEmail>
  );
};

export default ForgotPassword;
