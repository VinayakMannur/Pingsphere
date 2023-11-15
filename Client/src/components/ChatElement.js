import { faker } from "@faker-js/faker";
import { Avatar, Badge, Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StyledBadge from "./StyleBadge";
import { useDispatch, useSelector } from "react-redux";
import { SelectConversation, UpdateConversation, UpdateGroupConversation, UpdateToOneToOneConversation } from "../redux/slices/app";
import {
  EmptyCurrentConversation,
  FetchGrpChats,
  NewlyAddedAdmins,
  UpdateConversationId,
  UpdateGrpNameAdmin,
} from "../redux/slices/conversation";
import { socket } from "../socket";
import { useEffect } from "react";
import useResponsive from "../hooks/useResponsive";

const ChatElement = ({
  id,
  user_id,
  img,
  name,
  msg,
  time,
  pinned,
  online,
  unread,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { to_user_name } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const { chat_type } = useSelector((state) => state.app);
  const { groupName, groupAdmin } = useSelector((state)=> state.conversation.group_chat)
  const isMobile = useResponsive("between", "md", "xs", "sm");


  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 2,
        backgroundColor:
          to_user_name === name
            ? theme.palette.primary.main
            : theme.palette.mode === "light"
            ? "#fff"
            : theme.palette.background.default,
      }}
      onClick={() => {
        if(chat_type === "group"){
          if(isMobile){
            dispatch(UpdateGroupConversation())
          }
          console.log("get_group_messages", id);
          socket.emit("get_group_messages",{id}, (data)=>{
            console.log(data);
            const adminName = `${data.grpAdmin.firstName} ${data.grpAdmin.lastName}`
            const groupAdminId = data.grpAdmin.id
            dispatch(UpdateGrpNameAdmin({groupId: id, groupName: name, groupAdmin: adminName, groupAdminId: groupAdminId}))
            dispatch(FetchGrpChats(data.grpMessages))
            dispatch(NewlyAddedAdmins(data.admins))
          })
        }
        else{
          if(isMobile){
            dispatch(UpdateToOneToOneConversation())
          }
          dispatch(
            UpdateConversationId({
              conversationId: id,
              to_user: user_id,
              to_user_name: name,
              to_user_status: true,
            })
          );
          dispatch(EmptyCurrentConversation());
          dispatch(SelectConversation());
        }
        
      }}
    >
      <Stack direction={"row"} justifyContent={"space-between"} p={1.1}>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={faker.image.avatar()} />
            </StyledBadge>
          ) : (
            <Avatar src={faker.image.avatar()} />
          )}
          {to_user_name === name ? (
            <Stack spacing={0.2}>
              <Typography variant="subtitle2" color={"#fff"}>
                {name}
              </Typography>
              <Typography variant="caption" color={"#fff"}>
                {msg}
              </Typography>
            </Stack>
          ) : (
            <Stack spacing={0.2}>
              <Typography variant="subtitle2">{name}</Typography>
              <Typography variant="caption">{msg}</Typography>
            </Stack>
          )}
        </Stack>
        <Stack alignItems={"center"} spacing={1.5}>
          {to_user_name === name ? (
            <Typography fontWeight={500} variant="caption" color={"#fff"}>
              {time}
            </Typography>
          ) : (
            <Typography fontWeight={500} variant="caption">
              {time}
            </Typography>
          )}
          <Badge color="primary" badgeContent={unread}></Badge>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatElement;
