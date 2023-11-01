import React from "react";
import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { CaretLeft } from "phosphor-react";
import ResetForm from "../../components/forms/ResetForm";

const ResetPassword = () => {
  return (
    <>
      <Stack spacing={3} sx={{ my: 4, position: "releative" }}>
        <Typography variant="h5">Forgot your password ?</Typography>
        <Typography>
          Please enter the email address associated with your account and we
          will send you a link to reset your password
        </Typography>
      </Stack>

      {/* reset form */}
      <ResetForm />

      <Stack direction={"row"} alignItems={"center"}>
        <CaretLeft />
        <Link to="/auth/login" component={RouterLink} variant="subtitle2">
          Return to Login
        </Link>
      </Stack>
    </>
  );
};

export default ResetPassword;
