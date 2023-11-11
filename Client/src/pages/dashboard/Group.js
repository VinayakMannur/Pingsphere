import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import GroupChats from "../../components/GroupChats";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { UpdateConversation } from "../../redux/slices/app";
import { socket } from "../../socket";
import { UpdateGroupList } from "../../redux/slices/conversation";
import Conversation from "../../components/conversation";
import NoChatSVG from "../../assets/Illustration/NoChat"

const Group = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const user_id = window.localStorage.getItem("user_id");
  const { sidebar, chat_type } = useSelector((store) => store.app);

  useEffect(() => {
    dispatch(UpdateConversation());
    socket.emit("get_group_list", { user_id }, (data) => {
      console.log(data);
      dispatch(UpdateGroupList(data));
    });
  }, []);

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* left */}
        <GroupChats />

        {/* right */}
        <Box
          sx={{
            height: "100%",
            width: sidebar.open ? "calc(100vw - 720px)" : "calc(100vw - 405px)",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F0F4FA"
                : theme.palette.background.default,
          }}
        >
          {chat_type === "group" ? (
            <Conversation />
          ) : (
            <Stack
              spacing={2}
              sx={{ height: "100%", width: "100%" }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <NoChatSVG />
              <Typography variant="subtitle2">
                Select a conversation or start a new one
              </Typography>
            </Stack>
          )}
        </Box>
      </Stack>
    </>
  );
};

export default Group;
