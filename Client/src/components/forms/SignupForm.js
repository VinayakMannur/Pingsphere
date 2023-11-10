import React, { useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { Eye, EyeSlash } from "phosphor-react";
import { SignupUser } from "../../redux/slices/auth";
import { useDispatch } from "react-redux";

const SignupForm = () => {

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState('')
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(SignupUser({ firstName, lastName, email, password, phonenumber }));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <Stack spacing={3} mt={2}>
        <Stack spacing={4} direction={{xs:"column", sm:"row"}}>
          <TextField
            required
            fullWidth
            id="firstname"
            label="First Name"
            variant="outlined"
            onInput={(e) => setFirstName(e.target.value)}
          />
          <TextField
            required
            fullWidth
            id="lastname"
            label="Last Name"
            variant="outlined"
            onInput={(e) => setLastName(e.target.value)}
          />
        </Stack>

        <TextField
          required
          fullWidth
          id="email"
          label="Email"
          variant="outlined"
          onInput={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          fullWidth
          id="phonenumber"
          label="Phone Number"
          variant="outlined"
          onInput={(e) => setPhonenumber(e.target.value)}
        />
        <TextField
          fullWidth
          required
          id="password"
          label="Password"
          variant="outlined"
          onInput={(e) => setPassword(e.target.value)}
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
      </form>
    </>
  );
};

export default SignupForm;
