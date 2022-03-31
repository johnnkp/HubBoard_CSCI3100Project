import React from "react";
import ResendEmail from "../../../components/Helpers/ResendEmail";
import axios from "axios";

const ResendEmailVerification = () => {
  const resendVerificationEmail = async (values, action) => {
    try {
      const res = await axios.post("/api/auth/emailResend", values);
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  };

  return (
    <ResendEmail resendEmailHandler={resendVerificationEmail} type={1}>
      Verification letter has been resend, please check again your email
    </ResendEmail>
  );
};

export default ResendEmailVerification;
