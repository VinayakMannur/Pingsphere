import { Container } from "@mui/material";
import React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useDispatch, useSelector } from "react-redux";
import { VerifyUser } from "../../redux/slices/auth";

const VerifyForm = () => {
  const dispatch = useDispatch();

  const {email} = useSelector((state) => state.auth)

  const [otp, setOtp] = React.useState("");

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const handleComplete = (value) => {
    try {
      dispatch(VerifyUser({otp: value, email}))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <MuiOtpInput
          display="flex"
          gap={2}
          length={6}
          value={otp}
          onChange={handleChange}
          onComplete={handleComplete}
          TextFieldsProps={{ placeholder: "*" }}
        />
      </Container>
    </>
  );
};

export default VerifyForm;
