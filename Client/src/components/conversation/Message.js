import React from "react";
import { Box, Stack } from "@mui/material";

import {
  // DocMsg,
  // LinkMsg,
  // MediaMsg,
  // ReplyMsg,
  TextMsg,
  // Timeline,
} from "./MsgTypes";
import { useSelector } from "react-redux";

const Message = ({menu}) => {

  const {current_conversation} = useSelector((state)=> state.conversation.direct_chat)
  const {grpConversation} = useSelector((state)=> state.conversation.group_chat)
  const { chat_type } = useSelector((state) => state.app);

  return (
    <Box p={2}>
      <Stack spacing={2}>
        {chat_type === "group" ?(grpConversation.length>0 && grpConversation.map((el, idx) => {
          return <TextMsg key={idx} el={el} idx={idx} menu={menu}/>;   
        })): (current_conversation && current_conversation.map((el, idx) => {
          return <TextMsg key={idx} el={el} idx={idx} menu={menu}/>;
        }))
        }
      </Stack>
    </Box>
  );
};

export default Message;

// switch (el.subtype) {
//   case "img":
//     return <MediaMsg el={el} idx={idx} menu={menu}/>;
//   case "doc":
//     return <DocMsg el={el} idx={idx} menu={menu}/>;
//   case "link":
//     return <LinkMsg el={el} idx={idx} menu={menu}/>;
//   case "reply":
//     return <ReplyMsg el={el} idx={idx} menu={menu}/>;
//   default:
//     return <TextMsg el={el} idx={idx} menu={menu}/>;
// }