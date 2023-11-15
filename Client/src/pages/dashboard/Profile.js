import React, { useEffect } from "react";
import { Box, IconButton,Avatar, Stack, Typography } from "@mui/material";
import { faker } from "@faker-js/faker";
import { useTheme } from "@mui/material/styles";
import { CaretLeft } from "phosphor-react";
import ProfileForm from "../../components/forms/ProfileForm";
import useResponsive from "../../hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import { UpdateOneToOneChats, UpdateSelfInfo } from "../../redux/slices/app";
import { socket } from "../../socket";

const Profile = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const user_id = parseInt(window.localStorage.getItem("user_id"));
  useEffect(()=>{
    socket.emit("get_self_info",{user_id}, (data)=>{
      // console.log(data);
      dispatch(UpdateSelfInfo(data))
    })
  },[])

  const {name, email, phoneNumber} = useSelector((state)=>state.app.selfInfo)

  return (
    <>
    <Stack direction={"row"} width={"100%"}>
        {/* left */}
        <Box
          sx={{
            width: isMobile ? "100%" : 320,
            height: "100vh",
            // overflow: "scroll",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.paper,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
            {/* header */}
            <Stack spacing={2} direction={"row"} alignItems={"center"}>
                <IconButton onClick={()=>{
                  dispatch(UpdateOneToOneChats())
                }}>
                    <CaretLeft size={24} color="#4B4B4B"/>
                </IconButton>
                <Typography variant="h5">Profile</Typography>
            </Stack>
            <Stack alignItems={"center"} direction={"row"} p={1} spacing={3}>
              <Avatar
                alt={faker.name.firstName()}
                src={faker.image.avatar()}
                sx={{ height: 80, width: 80 }}
              />
              <Stack direction={"column"} spacing={0.5}>
                <Typography variant="article">
                  {name}
                </Typography>
                <Typography variant="body2">{email}</Typography>
                <Typography variant="body2">{phoneNumber}</Typography>
              </Stack>
            </Stack>
            {/* form */}
            {/* <ProfileForm/> */}
        </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Profile;
