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
import { LoginUser } from "../../redux/slices/auth";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(LoginUser({ email, password }));
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
            type="email"
            label="Email"
            variant="outlined"
            onInput={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <TextField
            required
            fullWidth
            id="password"
            label="Password"
            variant="outlined"
            onInput={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
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
            autoComplete="current-password"
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
      </form>
    </>
  );
};

export default LoginForm;
