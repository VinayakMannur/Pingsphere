import React from "react";
import { Avatar, Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Bell, CaretLeft, Image, Info, Key, Lock, Note, PencilCircle } from "phosphor-react";
import { faker } from "@faker-js/faker";
import useResponsive from "../../hooks/useResponsive";

const list = [
  {
    key: 0,
    icon: <Bell size={20} />,
    title: "Notifications",
    onClick: () => {},
  },
  {
    key: 1,
    icon: <Lock size={20} />,
    title: "Privacy",
    onClick: () => {},
  },
  {
    key: 2,
    icon: <Key size={20} />,
    title: "Security",
    onClick: () => {},
  },
  {
    key: 3,
    icon: <PencilCircle size={20} />,
    title: "Theme",
    onClick: () => {},
  },
  {
    key: 4,
    icon: <Image size={20} />,
    title: "Chat Wallpaper",
    onClick: () => {},
  },
  {
    key: 5,
    icon: <Note size={20} />,
    title: "Request Account Info",
    onClick: () => {},
  },
  {
    key: 6,
    icon: <Info size={20} />,
    title: "Help",
    onClick: () => {},
  },
];

const Settings = () => {
  const theme = useTheme();
  const isMobile = useResponsive("between", "md", "xs", "sm");
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
          <Stack p={2} spacing={3}>
            {/* header */}
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
              <IconButton>
                <CaretLeft size={24} color="#4B4B4B" />
              </IconButton>
              <Typography variant="h6">Settings</Typography>
            </Stack>

            {/* profile */}
            <Stack alignItems={"center"} direction={"row"} p={1} spacing={3}>
              <Avatar
                alt={faker.name.firstName()}
                src={faker.image.city()}
                sx={{ height: 64, width: 64 }}
              />
              <Stack direction={"column"} spacing={0.5}>
                <Typography variant="article">
                  {faker.name.firstName()}
                </Typography>
                <Typography variant="body2">{faker.random.words()}</Typography>
              </Stack>
            </Stack>

            {/* List of options */}
            <Stack spacing={3} p={1}>
              {list.map(({key, icon, title, onClick}) => { 
                return (<>
                  <Stack key={key} sx={{cursor:"pointer"}} spacing={2} onClick={onClick}>
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                      {icon}
                      <Typography variant="body2">{title}</Typography>
                    </Stack>
                  </Stack>
                  {key !== 6 && <Divider/>}
                </>)
              })}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Settings;
