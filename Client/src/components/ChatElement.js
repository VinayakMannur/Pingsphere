import { faker } from "@faker-js/faker";
import { Avatar, Badge, Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StyledBadge from "./StyleBadge";
import { useDispatch } from "react-redux";
import { SelectConversation } from "../redux/slices/app";
import { EmptyCurrentConversation, UpdateConversationId } from "../redux/slices/conversation";
import { socket } from "../socket";

const ChatElement = ({ id, user_id ,img, name, msg, time, pinned, online, unread }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const from_user = window.localStorage.getItem("user_id")

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 2,
        backgroundColor:
          theme.palette.mode === "light"
            ? "#fff"
            : theme.palette.background.default,
      }}
      onClick={() => {
        // console.log(id, user_id);
        dispatch(UpdateConversationId({conversationId: id, to_user: user_id, to_user_name: name, to_user_status: true}))
        dispatch(EmptyCurrentConversation())
        dispatch(SelectConversation())
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
          <Stack spacing={0.2}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption">{msg}</Typography>
          </Stack>
        </Stack>
        <Stack alignItems={"center"} spacing={1.5}>
          <Typography fontWeight={500} variant="caption">
            {time}
          </Typography>
          <Badge color="primary" badgeContent={unread}></Badge>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatElement;
