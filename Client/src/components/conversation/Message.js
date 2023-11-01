import React from "react";
import { Box, Stack } from "@mui/material";
import { Chat_History } from "../../data/index";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from "./MsgTypes";

const Message = ({menu}) => {
  return (
    <Box p={2}>
      <Stack spacing={2}>
        {Chat_History.map((el, idx) => {
          switch (el.type) {
            case "divider":
              return <Timeline el={el} idx={idx}/>;
            case "msg":
              switch (el.subtype) {
                case "img":
                  return <MediaMsg el={el} idx={idx} menu={menu}/>;
                case "doc":
                  return <DocMsg el={el} idx={idx} menu={menu}/>;
                case "link":
                  return <LinkMsg el={el} idx={idx} menu={menu}/>;
                case "reply":
                  return <ReplyMsg el={el} idx={idx} menu={menu}/>;
                default:
                  return <TextMsg el={el} idx={idx} menu={menu}/>;
              }
            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
