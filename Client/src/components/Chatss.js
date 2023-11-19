import React, { useEffect, useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CircleDashed, MagnifyingGlass, Users } from "phosphor-react";
import { ChatList } from "../data";
import { SimpleBarStyle } from "./Scrollbar";
import { Search, SearchIconWrapper, StyledInputBase } from "./search";
import ChatElement from "./ChatElement";
import useResponsive from "../hooks/useResponsive";
import Friends from "./Friends";
import { socket } from "../socket";
import { useSelector, useDispatch } from "react-redux";
import { FetchDirectConversation } from "../redux/slices/conversation";
import { SelectConversation } from "../redux/slices/app";

const Chatss = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useResponsive("between", "md", "xs", "sm");

  const [openDialog, setOpenDialog] = useState(false);

  const user_id = window.localStorage.getItem("user_id");

  const { conversations } = useSelector(
    (state) => state.conversation.direct_chat
  );
    // console.log(conversations);
  useEffect(() => {
    dispatch(SelectConversation())
    socket.emit("get_direct_conversations", { user_id }, (data) => {
      //data is list of existing conversations
      console.log(data);
      dispatch(FetchDirectConversation({data}))
    });
  }, []);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: isMobile ? "100%" : 320,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h5">Chats</Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <IconButton
                onClick={() => {
                  handleOpenDialog();
                }}
              >
                <Users />
              </IconButton>
            </Stack>
          </Stack>
          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search..." />
            </Search>
          </Stack>
          {/* <Stack spacing={1}>
                    <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <ArchiveBox size={20} />
                        <Button>Archive</Button>
                    </Stack>
                    <Divider />
                </Stack> */}
          <Stack
            direction={"column"}
            spacing={1.2}
            sx={{
              height: "100%",
              flexGrow: 1,
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
          >
            <SimpleBarStyle timeout={500} clickOnTrack={false}>
              {/* <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: "#767676" }}>
                  Pinned
                </Typography>
                {ChatList.filter((el) => el.pinned).map((el) => {
                  return <ChatElement {...el} />;
                })}
              </Stack> */}
              <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ color: "#767676" }}>
                All Chats
              </Typography>
              {conversations.filter((el) => !el.pinned).map((el, idx) => {
                return <ChatElement key={idx} {...el} />;
              })}
            </Stack>
            </SimpleBarStyle>
          </Stack>
        </Stack>
      </Box>

      {openDialog && (
        <Friends open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Chatss;
