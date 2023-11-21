import { Stack, Typography } from "@mui/material";
import React from "react";
import VerifyForm from "../../components/forms/VerifyForm";

const Verify = () => {
  return (
    <>
      <Stack spacing={3} sx={{ my: 4, position: "releative" }}>
        <Typography variant="h5">Please verify the OTP</Typography>
        <Typography variant="body2">An OTP has been sent your email!</Typography>

        {/* verifyForm */}
        <VerifyForm/>

      </Stack>
    </>
  );
};

export default Verify;
