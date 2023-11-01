import React, { useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { Eye, EyeSlash } from "phosphor-react";
import { Link as RouterLink } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

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
        <TextField
          required
          fullWidth
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
      <Stack alignItems={"flex-end"} sx={{ my: 1 }}>
        <Link
          to="/auth/resetpassword"
          component={RouterLink}
          variant="body2"
          color={"inherit"}
        >
          Forgot Password?
        </Link>
      </Stack>
      <Button fullWidth type="submit" variant="contained">
        Login
      </Button>
    </>
  );
};

export default LoginForm;
