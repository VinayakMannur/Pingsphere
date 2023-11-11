import React from "react";
import Chatss from "../../components/Chatss";
import { Box, Stack, Typography } from "@mui/material";
import Conversation from "../../components/conversation";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";
import {  useSelector } from "react-redux";
import SharedMessage from "../../components/SharedMessage";
import StarredMessage from "../../components/StarredMessages";
import useResponsive from "../../hooks/useResponsive";
import NoChatSVG from "../../assets/Illustration/NoChat"


const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar, chat_type } = useSelector((store) => store.app);
  const {conversationId} = useSelector((state)=> state.conversation.direct_chat)

  const isMobile = useResponsive("between", "md", "xs", "sm");

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* {isMobile && <Conversation />} */}
        <Chatss />
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
            {conversationId !== null && chat_type === "individual" ? <Conversation />: 
              <Stack spacing={2} sx={{height: "100%", width: "100%"}} alignItems={"center"} justifyContent={"center"}>
                <NoChatSVG/>
                <Typography variant="subtitle2">Select a conversation or start a new one</Typography>
              </Stack>
            }
            
          </Box>
        )}
        {sidebar.open &&
          (() => {
            switch (sidebar.type) {
              case "CONTACT":
                return <Contact />;
              case "STARRED":
                return <StarredMessage />;
              case "SHARED":
                return <SharedMessage />;
              default:
                break;
            }
          })()}
      </Stack>
    </>
  );
};

export default GeneralApp;
