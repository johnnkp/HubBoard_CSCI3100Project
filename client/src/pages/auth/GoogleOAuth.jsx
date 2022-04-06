import React, { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/slice/auth";

const GoogleOAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // INFO: useMemo hook to prevent for loop every time
  const queryParams = useMemo(() => {
    const getQueryParams = (params) => {
      const tempParams = {};
      for (let pair of params.entries()) {
        tempParams[pair[0]] = pair[1];
      }
      return tempParams;
    };
    return getQueryParams(searchParams);
  }, [searchParams]);
  // console.log(queryParams)

  // INFO: fetch /api/auth/google/callback on component mount
  useEffect(() => {
    const googleCallback = async () => {
      try {
        const res = await axios.post("/api/auth/google/callback", null, {
          params: queryParams,
        });
        // console.log(res.data);
        if (res.data.success) {
          if (res.data.redirectPage === "hubboard") {
            dispatch(authActions.login());
          } else {
            dispatch(authActions.googleLogin({ useremail: res.data.email }));
          }
          navigate(`/${res.data.redirectPage}`, { replace: true });
        }
      } catch (err) {
        console.log(err.response);
      }
    };
    googleCallback();
  }, [dispatch, navigate, queryParams]);

  return (
    <Box
      display="flex"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress color="hOrange" />
    </Box>
  );
};

export default GoogleOAuth;
