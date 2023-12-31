import React, { useRef, useState } from "react";
import {
  Box,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Fab,
  Tooltip,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { LinkSimple, PaperPlaneTilt, Smiley } from "phosphor-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Actions } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import useResponsive from "../../hooks/useResponsive";
// import { PushToGrpConversation } from "../../redux/slices/conversation";

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

const ChatInput = ({ inputRef, value, setValue, setOpenPicker }) => {
  const [openActions, setOpenActions] = useState(false);

  return (
    <StyledInput
      inputRef={inputRef}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      fullWidth
      placeholder="Write a message..."
      variant="filled"
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <Stack sx={{ width: "max-content" }}>
            <Stack
              sx={{
                position: "relative",
                display: openActions ? "inline" : "none",
              }}
            >
              {Actions.map((el, idx) => {
                return (
                  <Tooltip key={idx} title={el.title} placement={"right"}>
                    <Fab
                      onClick={() => {
                        setOpenActions(!openActions);
                      }}
                      sx={{
                        position: "absolute",
                        top: -el.y,
                        backgroundColor: el.color,
                      }}
                    >
                      {el.icon}
                    </Fab>
                  </Tooltip>
                );
              })}
            </Stack>

            <InputAdornment position="start">
              <IconButton
                onClick={() => {
                  setOpenActions((prev) => !prev);
                }}
              >
                <LinkSimple />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setOpenPicker((prev) => !prev);
              }}
            >
              <Smiley />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

const Footer = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [openPicker, setOpenPicker] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const user_id = window.localStorage.getItem("user_id");
  const { restrict, groupAdminId, groupId } = useSelector(
    (state) => state.conversation.group_chat
  );
  const { chat_type } = useSelector((state) => state.app);
  const { conversationId, to_user } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const isMobile = useResponsive("between", "md", "xs", "sm");

  function handleEmojiClick(emoji) {
    const input = inputRef.current;

    if (input) {
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;

      setValue(
        value.substring(0, selectionStart) +
          emoji +
          value.substring(selectionEnd)
      );

      // Move the cursor to the end of the inserted emoji
      input.selectionStart = input.selectionEnd = selectionStart + 1;
    }
  }

  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
      }}
    >
      <Stack alignItems={"center"} direction={"row"} spacing={2}>
        {/* chat */}
        <Stack sx={{ width: "100%" }}>
          <Box
            sx={{
              display: openPicker ? "inline" : "none",
              zIndex: 10,
              position: "fixed",
              bottom: 82,
              right: isMobile? 40: 81,
            }}
          >
            <Picker
              theme={theme.palette.mode}
              data={data}
              onEmojiSelect={(emoji) => {
                handleEmojiClick(emoji.native);
              }}
            />
          </Box>
          {groupAdminId === parseInt(user_id) || !restrict ? (
            <ChatInput
              inputRef={inputRef}
              value={value}
              setValue={setValue}
              setOpenPicker={setOpenPicker}
            />
          ) : (
            <StyledInput
              disabled
              fullWidth
              placeholder="Only admin can send a message..."
              variant="filled"
            />
          )}
        </Stack>
        <Box
          sx={{
            height: 45,
            width: 45,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 1.5,
          }}
        >
          {restrict? <></>:
          <Stack
            sx={{ height: "100%", width: "100%" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <IconButton
              onClick={() => {
                // console.log(to_user);
                if (chat_type === "group") {
                  // console.log("loging grp message", value);
                  // dispatch(PushToGrpConversation({
                  //   id: 1,
                  //   type: "msg",
                  //   message: value,
                  //   outgoing: true,
                  //   incoming: false
                  // }))
                  socket.emit("grp_message", {
                    message: value,
                    groupId,
                    from: parseInt(user_id),
                  });
                  setValue("");
                } else {
                  socket.emit("text_message", {
                    message: value,
                    conversationId: conversationId,
                    from: parseInt(user_id),
                    to: to_user,
                  });
                  setValue("");
                }
              }}
            >
              <PaperPlaneTilt color="#fff" />
            </IconButton>
          </Stack>
}
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
