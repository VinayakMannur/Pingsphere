import React, { useState } from "react";
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

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

const ChatInput = ({ setOpenPicker }) => {
  const [openActions, setOpenActions] = useState(false);
  return (
    <StyledInput
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
              {Actions.map((el) => {
                return (
                  <Tooltip title={el.title} placement={"right"}>
                    <Fab
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

            <InputAdornment>
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
          <InputAdornment>
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
  const theme = useTheme();
  const [openPicker, setOpenPicker] = useState(false);
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
              right: 81,
            }}
          >
            <Picker
              theme={theme.palette.mode}
              data={data}
              onEmojiSelect={console.log}
            />
          </Box>
          <ChatInput setOpenPicker={setOpenPicker} />
        </Stack>
        <Box
          sx={{
            height: 45,
            width: 45,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 1.5,
          }}
        >
          <Stack
            sx={{ height: "100%", width: "100%" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <IconButton>
              <PaperPlaneTilt color="#fff" />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
