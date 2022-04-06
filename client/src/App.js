import React, {useEffect} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import axios from "axios";
// INFO: import useSelector to get the state from redux
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "./store/slice/auth";

// INFO: import Pages
import {MainLayout} from "./components/Layout";
import Home from "./pages/home/Home";
import {Auth, ForgotPassword, GoogleOAuth, ResetPassword} from "./pages/auth";
import Hubboard from "./pages/hubboard/Hubboard";
import {
  MailSuccess,
  MailVerification,
  Register,
  ResendEmailVerification,
} from "./pages/auth/register";
import {
  Mainpage,
  Profilepage,
  ChangePasswordpage,
  Syncpage,
  PMpage,
  Adminpage,
} from "./pages/hubboard/main";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate;

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get("/api/user/authVerify");
        if (res.data.success) {
          dispatch(authActions.login());
          navigate("/hubboard");
        }
      } catch (err) {}
      try {
        const res = await axios.get("/api/admin/adminVerify");
        dispatch(authActions.login(true));
      } catch (err) {}
    };
    verify();
  });

  const user = useSelector((state) => state.auth);
  // console.log(user.isAuthenticated);
  // INFO: different routing path
  return (
    <Routes>
      <Route
        path="/"
        element={<Home isAuthenticated={user.isAuthenticated}/>}
      />
      <Route path="signup" element={<Register/>}/>
      <Route path="forgotpw" element={<ForgotPassword/>}/>
      <Route path="/auth" element={<Auth/>}>
        <Route path="*" element={<h1>404 Not Found</h1>}/>
        <Route path="mailsuccess" element={<MailSuccess/>}/>
        <Route path="resendEmail" element={<ResendEmailVerification/>}/>
        <Route path=":token" element={<MailVerification/>}/>
        <Route path="forgotpw/:token" element={<ResetPassword/>}/>
      </Route>
      <Route path="/googlecb" element={<GoogleOAuth/>}/>
      <Route
        path="/hubboard"
        element={<Hubboard isAuthenticated={user.isAuthenticated}/>}
      >
        <Route path="" element={<Mainpage/>}/>
        <Route path="note" element={<Mainpage/>}/>
        <Route path="sync" element={<Syncpage/>}/>
        <Route path="privatemessage" element={<PMpage/>}/>
        <Route path="profile" element={<Profilepage/>}/>
        <Route path="changepassword" element={<ChangePasswordpage/>}/>
        <Route
          path="adminmanagement"
          element={user.isAdmin ? <Adminpage/> :
            <MainLayout profilepage={true}>
              <h1>You are not admin</h1>
            </MainLayout>
          }
        />
      </Route>
      <Route path="*" element={<h1>404 Not found</h1>}/>
    </Routes>
  );
};

export default App;
