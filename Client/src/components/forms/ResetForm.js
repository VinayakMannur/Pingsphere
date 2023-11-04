import React, { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { ResetPassword } from "../../redux/slices/auth";
import { useDispatch } from "react-redux";

const ResetForm = () => {

  const dispatch = useDispatch()

  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(ResetPassword({email}))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            onInput={(e) => setEmail(e.target.value)}
          />
        </Stack>

        <Button sx={{ my: 3 }} fullWidth type="submit" variant="contained">
          Request Link
        </Button>
      </form>
    </>
  );
};

export default ResetForm;
