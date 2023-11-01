import React from "react";
import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthSocial from "../../components/AuthSocial";
import SignupForm from "../../components/forms/SignupForm";

const Signup = () => {
  return (
    <>
      <Stack spacing={3} sx={{ my: 4, position: "releative" }}>
        <Typography variant="h5">Get started with something</Typography>
      </Stack>
      <Stack direction={"row"} spacing={1}>
        <Typography variant="body2">Already Registered..?</Typography>
        <Link to="/auth/login" component={RouterLink} variant="subtitle2">
          Login
        </Link>
      </Stack>
      {/* login form */}
      <SignupForm />

      <Typography
        component={"div"}
        sx={{
          color: "text.secondary",
          my: 2,
          textAlign: "center",
          typography: "caption",
        }}
      >
        {"By signing up, I agree to "}
        <Link underline="always" color="text.primary">
          Terms of service
        </Link>
        {" and "}
        <Link underline="always" color="text.primary">
          Privacy Policy
        </Link>
      </Typography>

      {/* Social media login */}
      <AuthSocial />
    </>
  );
};

export default Signup;
