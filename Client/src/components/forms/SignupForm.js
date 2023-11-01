import React, { useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { Eye, EyeSlash } from "phosphor-react";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <Stack spacing={3} mt={2}>
        <Stack spacing={4} direction={{xs:"column", sm:"row"}}>
          <TextField
            required
            fullWidth
            id="firstname"
            label="First Name"
            variant="outlined"
          />
          <TextField
            required
            fullWidth
            id="lastname"
            label="Last Name"
            variant="outlined"
          />
        </Stack>

        <TextField
          required
          fullWidth
          id="email"
          label="Email"
          variant="outlined"
        />
        <TextField
          fullWidth
          required
          id="password"
          label="Password"
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
      </Stack>
      {/* <Stack alignItems={"flex-end"} sx={{ my: 1 }}>
        <Link variant="body2" color={"inherit"} underline="always">
          Forgot Password?
        </Link>
      </Stack> */}
      <Button sx={{mt:3}} fullWidth type="submit" variant="contained">
        Sign Up
      </Button>
    </>
  );
};

export default SignupForm;
