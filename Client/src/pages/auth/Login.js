import React from "react";
import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthSocial from "../../components/AuthSocial";
import LoginForm from "../../components/forms/LoginForm";

const Login = () => {
  return (
    <>
      <Stack spacing={3} sx={{ my: 4, position: "releative" }}>
        <Typography variant="h5">Login to Pingsphere</Typography>
        <Stack direction={"row"} spacing={1}>
          <Typography variant="body2">New User..?</Typography>
          <Link to="/auth/signup" component={RouterLink} variant="subtitle2">
            Create an account
          </Link>
        </Stack>
        {/* login form */}
        <LoginForm />
        {/* Social media login */}
        <AuthSocial />
      </Stack>
    </>
  );
};

export default Login;
