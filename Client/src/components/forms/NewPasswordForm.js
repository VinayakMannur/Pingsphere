import React, { useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { Eye, EyeSlash } from "phosphor-react";

const NewPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Stack spacing={3}>
        <TextField
          required
          fullWidth
          id="password"
          label="Password"
          variant="outlined"
          type="password"
        />
        <TextField
          required
          fullWidth
          id="confirm-password"
          label="Confirm Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <Eye color="#000" />
                  ) : (
                    <EyeSlash color="#000" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button fullWidth type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </>
  );
};

export default NewPasswordForm;
