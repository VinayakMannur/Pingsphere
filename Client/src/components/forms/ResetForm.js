import React from "react";
import { Button, Stack, TextField } from "@mui/material";

const ResetForm = () => {
  return (
    <>
      <Stack spacing={3}>
        <TextField
          required
          fullWidth
          id="email"
          label="Email"
          variant="outlined"
        />
      </Stack>

      <Button sx={{ my: 3 }} fullWidth type="submit" variant="contained">
        Request Link
      </Button>
    </>
  );
};

export default ResetForm;
