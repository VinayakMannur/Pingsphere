import React from "react";
import { UpdateSidebarType } from "../redux/slices/app";
import { useDispatch } from "react-redux";
import {
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { CaretLeft } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import Message from "./conversation/Message";

const StarredMessage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Box sx={{ width: 320, height:"100vh" }}>
      <Stack width={"100%"} height={"100%"}>
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.paper,
          }}
        >
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction={"row"}
            alignItems={"center"}
            spacing={2}
          >
            <IconButton
              onClick={() => {
                dispatch(UpdateSidebarType("CONTACT"));
              }}
            >
              <CaretLeft />
            </IconButton>
            <Typography variant="subtitle2">Starred Messages</Typography>
          </Stack>
        </Box>
        {/* body */}
        <Stack
          sx={{
            height: "100%",
            flexGrow: 1,
            position: "relative",
            overflowY: "scroll",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "0.4em",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
          p={1}
          spacing={2}
        >
          <Message menu={false}/>
        </Stack>
        
      </Stack>
    </Box>
  );
};

export default StarredMessage;
