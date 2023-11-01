import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import ProfileForm from "../../components/forms/ProfileForm";
import useResponsive from "../../hooks/useResponsive";

const Profile = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width:  isMobile ? "100%" : 320,
          backgroundColor: (theme)=>
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
            {/* header */}
            <Stack spacing={2} direction={"row"} alignItems={"center"}>
                <IconButton>
                    <CaretLeft size={24} color="#4B4B4B"/>
                </IconButton>
                <Typography variant="h5">Profile</Typography>
            </Stack>

            {/* form */}
            <ProfileForm/>
        </Stack>
      </Box>
    </>
  );
};

export default Profile;
