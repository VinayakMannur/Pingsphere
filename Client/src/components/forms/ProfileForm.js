import React from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";

const ProfileForm = () => {
  return (
    <>
      <Stack spacing={3} p={1}>
        <TextField
          required
          fullWidth
          id="name"
          label="Name"
          variant="outlined"
        />
        <Typography variant="body2">
          This name is visible to all of your contacts
        </Typography>
        <TextField
          required
          multiline
          rows={3}
          fullWidth
          id="about"
          label="About"
          variant="outlined"
        />
        <Stack direction={"row"} justifyContent={"end"}>
            <Button variant="outlined" type="submit">Save</Button>
        </Stack>
      </Stack>
    </>
  );
};

export default ProfileForm;
