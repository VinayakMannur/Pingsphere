import React, {  useLayoutEffect, useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import { FetchDirectConversation } from "../../redux/slices/conversation";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";

const Conversation = () => {
  const dispatch = useDispatch()
  const scrollContainerRef = useRef();
  const user_id = window.localStorage.getItem("user_id")

  const {current_conversation} = useSelector((state)=> state.conversation.direct_chat)

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      const scrollHeight = scrollContainerRef.current.scrollHeight;
      const clientHeight = scrollContainerRef.current.clientHeight;
      const scrollBottom = scrollHeight - clientHeight;
      scrollContainerRef.current.scrollTop = scrollBottom;
    }
  };
  // console.log("scroll", scroll);
  useLayoutEffect(() => {
    scrollToBottom();
    socket.emit("get_direct_conversations", { user_id }, (data) => {
      //data is list of existing conversations
      console.log(data);
      dispatch(FetchDirectConversation({data}))
    });
    console.log('runnned');
  }, [current_conversation]);

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
      <Footer/>
    </Stack>
  );
};

export default Conversation;
