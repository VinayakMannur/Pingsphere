import React, {  useLayoutEffect, useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import { FetchDirectConversation } from "../../redux/slices/conversation";
import { socket } from "../../socket";
import { useDispatch } from "react-redux";

const Conversation = () => {
  const dispatch = useDispatch()
  const scrollContainerRef = useRef();
  const [scroll, setScroll] = useState('')
  const user_id = window.localStorage.getItem("user_id")
  const scrollToBottom = () => {
    scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
  };

  useLayoutEffect(() => {
    socket.emit("get_direct_conversations", { user_id }, (data) => {
      //data is list of existing conversations
      console.log(data);
      dispatch(FetchDirectConversation({data}))
    });
    console.log('runnned');
    scrollToBottom();
  }, [scroll]);

  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* header */}
      <Header />

      {/* conversation */}
      <Box
       ref={scrollContainerRef}
        sx={{
          flexGrow: 1,
          height: "100%",
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
        width={"100%"}
      >
        <Message menu={true}/>
      </Box>
      
      {/* footer  */}
      <Footer setScroll={setScroll}/>
    </Stack>
  );
};

export default Conversation;
