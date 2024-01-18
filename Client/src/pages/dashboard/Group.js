import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import GroupChats from "../../components/GroupChats";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { UpdateConversation } from "../../redux/slices/app";
import { socket } from "../../socket";
import { UpdateGroupList } from "../../redux/slices/conversation";
import Conversation from "../../components/conversation";
import NoChatSVG from "../../assets/Illustration/NoChat";
import useResponsive from "../../hooks/useResponsive";
// import StarredMessage from "../../components/StarredMessages";
// import SharedMessage from "../../components/SharedMessage";
import Contact from "../../components/Contact";

const Group = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const user_id = window.localStorage.getItem("user_id");
  const { sidebar, chat_type } = useSelector((store) => store.app);
  const { group, contact } = useSelector((store) => store.app.mobile);
  const { groupId } = useSelector((state) => state.conversation.group_chat);

  useEffect(() => {
    dispatch(UpdateConversation());
    socket.emit("get_group_list", { user_id }, (data) => {
      // console.log(data);
      dispatch(UpdateGroupList(data));
    });
  }, []);

  const isMobile = useResponsive("between", "md", "xs", "sm");

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>

        {/* left */}
        {isMobile && chat_type === "group" && group === "chats" ? (
          <GroupChats />
        ) : (
          <></>
        )}
        {!isMobile && <GroupChats />}

        {/* right */}
        {isMobile && chat_type === "group" && contact === null && group === "conversation" ? (
          <Box
            sx={{
              height: isMobile?"100vh":"100%",
              width: "100%",
              backgroundColor:
                theme.palette.mode === "light"
                  ? "#F0F4FA"
                  : theme.palette.background.default,
            }}
          >
            {groupId !== null && chat_type === "group" ? (
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
        ) : (
          <></>
        )}

        {!isMobile && (
          <Box
            sx={{
              height: "100%",
              width: sidebar.open
                ? "calc(100vw - 720px)"
                : "calc(100vw - 405px)",
              backgroundColor:
                theme.palette.mode === "light"
                  ? "#F0F4FA"
                  : theme.palette.background.default,
            }}
          >
            {groupId !== null && chat_type === "group" ? (
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
        )}
        {isMobile && (contact === "onetoone" || contact === "group") ? <Contact />: <></>}

        {!isMobile && sidebar.open &&
        (() => {
          switch (sidebar.type) {
            case "CONTACT":
              return <Contact />;
            // case "STARRED":
            //   return <StarredMessage />;
            // case "SHARED":
            //   return <SharedMessage />;
            default:
              break;
          }
        })()}
      </Stack>
    </>
  );
};

export default Group;
