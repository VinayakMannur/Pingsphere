import React, { useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { Eye, EyeSlash } from "phosphor-react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { UpdatePassword } from "../../redux/slices/auth";

const NewPasswordForm = () => {

  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  function handleSubmit(e) {
    e.preventDefault();
    try {
      if(password === confirmPassword){
        dispatch(UpdatePassword({password, uniqueId: searchParams.get("token")}));
      }else{
        console.log("not equal");
      }     
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
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          onInput={(e) => setPassword(e.target.value)}
        />
        <TextField
          required
          fullWidth
          id="confirm-password"
          label="Confirm Password"
          variant="outlined"
          onInput={(e) => setConfirmPassword(e.target.value)}
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
      </form>
    </>
  );
};

export default NewPasswordForm;
