import React from "react";
import Chatss from "../../components/Chatss";
import { Box, Stack } from "@mui/material";
import Conversation from "../../components/conversation";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessage from "../../components/SharedMessage";
import StarredMessage from "../../components/StarredMessages";
import useResponsive from "../../hooks/useResponsive";

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar } = useSelector((store) => store.app);

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
            <Conversation />
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
