import React from "react";
import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { CaretLeft } from "phosphor-react";
import NewPasswordForm from "../../components/forms/NewPasswordForm";

const NewPassword = () => {
  return (
    <>
      <Stack spacing={3} sx={{ my: 4, position: "releative" }}>
        <Typography variant="h5">Reset your Password</Typography>
        <Typography>
          Enter your new password
        </Typography>
      </Stack>

      {/* new  password form */}
      <NewPasswordForm/>

      <Stack mt={2} direction={"row"} alignItems={"center"}>
        <CaretLeft />
        <Link to="/auth/login" component={RouterLink} variant="subtitle2">
          Return to Login
        </Link>
      </Stack>
    </>
  );
};

export default NewPassword;
