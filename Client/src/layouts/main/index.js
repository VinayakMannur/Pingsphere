import { Container, Stack } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Logo from "../../assets/Images/logo.png";

const isAuthenticated = true;

const MainLayout = () => {

  if(isAuthenticated){
    return <Navigate to="/app"/>
  }

  return (
    <>
      <Container sx={{ py: 5 }} maxWidth={"sm"}>
        <Stack spacing={5}>
          <Stack
            sx={{ width: "100%" }}
            direction={"column"}
            alignItems={"center"}
          >
            <img style={{ height: 100, width: 100 }} src={Logo} alt="Logo" />
          </Stack>
        </Stack>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
