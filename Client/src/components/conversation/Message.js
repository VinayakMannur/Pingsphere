import React from "react";
import { Box, Stack } from "@mui/material";

import {
  DocMsg,
  MediaMsg,
  TextMsg,
} from "./MsgTypes";
import { useSelector } from "react-redux";

const Message = () => {

  const {current_conversation} = useSelector((state)=> state.conversation.direct_chat)
  const {grpConversation} = useSelector((state)=> state.conversation.group_chat)
  const { chat_type } = useSelector((state) => state.app);

  return (
    <Box p={2}>
      <Stack spacing={2}>
        {chat_type === "group" ?(grpConversation.length>0 && grpConversation.map((el, idx) => {
          switch (el.type) {
            case "img":
              return <MediaMsg key={idx} el={el} idx={idx}/>;
            case "doc":
              return <DocMsg key={idx} el={el} idx={idx}/>;
            case "msg":
              return <TextMsg key={idx} el={el} idx={idx}/>;       
            default:
              return <></>;
          }
        })): (current_conversation && current_conversation.map((el, idx) => {
          switch (el.type) {
            case "img":
              return <MediaMsg key={idx} el={el} idx={idx}/>;
            case "doc":
              return <DocMsg key={idx} el={el} idx={idx}/>;
            case "msg":
              return <TextMsg key={idx} el={el} idx={idx}/>;
            default:
              return <></>;
          }
          
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