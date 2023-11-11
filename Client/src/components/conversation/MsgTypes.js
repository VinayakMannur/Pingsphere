import React from "react";
import {
  Box,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DotsThreeVertical, DownloadSimple, Image } from "phosphor-react";
import { Message_options } from "../../data";
import { useSelector } from "react-redux";

const DocMsg = ({ el, menu, idx }) => {
  const theme = useTheme();
  return (
    <Stack
      key={idx}
      direction={"row"}
      justifyContent={el.incoming ? "start" : "end"}
    >
      <Box
        p={1}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <Stack
            spacing={2}
            direction={"row"}
            alignItems={"center"}
            p={1}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Image size={30} />
            <Typography variant="caption">Abstract.png</Typography>
            <IconButton>
              <DownloadSimple />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            sx={{ color: el.incoming ? theme.palette.text : "#fff" }}
          >
            {el.message}
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  );
};

const LinkMsg = ({ el, menu, idx }) => {
  const theme = useTheme();
  return (
    <Stack
      key={idx}
      direction={"row"}
      justifyContent={el.incoming ? "start" : "end"}
    >
      <Box
        p={1}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <Stack
            spacing={1}
            alignItems={"start"}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <img
              src={el.preview}
              alt={el.message}
              style={{ maxHeight: 210, borderRadius: "10px" }}
            />
            <Stack spacing={1}>
              {/* <Typography variant="subtitle2">Creating Chat App</Typography> */}
              <Typography
                variant="subtitle2"
                sx={{ color: theme.palette.primary.main }}
                component={Link}
                to="//https://www/youtube/com"
              >
                www.youtube.com
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              color={el.incoming ? theme.palette.text : "#fff"}
            >
              {el.message}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  );
};

const ReplyMsg = ({ el, menu, idx }) => {
  const theme = useTheme();
  return (
    <Stack
      key={idx}
      direction={"row"}
      justifyContent={el.incoming ? "start" : "end"}
    >
      <Box
        p={1}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <Stack
            p={1}
            direction={"column"}
            spacing={2}
            alignItems={"center"}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color={theme.palette.text}>
              {el.message}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
          >
            {el.reply}
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  );
};

const MediaMsg = ({ el, menu, idx }) => {
  const theme = useTheme();
  return (
    <Stack
      key={idx}
      direction={"row"}
      justifyContent={el.incoming ? "start" : "end"}
    >
      <Box
        p={1}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <img
            src={el.img}
            alt={el.message}
            style={{ maxHeight: 210, borderRadius: "10px" }}
          />
          <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
          >
            {el.message}
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  );
};

const TextMsg = ({ el, menu, idx }) => {
  const theme = useTheme();
  const { chat_type } = useSelector((state) => state.app);
  const user_id = window.localStorage.getItem("user_id");
  return (
    <Stack
      key={idx}
      direction={"row"}
      justifyContent={el.incoming ? "start" : "end"}
    >
      {chat_type === "group" ? (
        <Box
          pb={1}
          px={1}
          pt={el.user_id !== parseInt(user_id)?0:1}
          sx={{
            backgroundColor: el.incoming
              ? theme.palette.background.default
              : theme.palette.primary.main,
            borderRadius: 1,
            width: "max-content",
          }}
        >
          {el.user_id !== parseInt(user_id) ? (
            <Typography
              variant="caption"
              sx={{ fontSize: "9px" }}
              color={el.incoming ? theme.palette.text : "#fff"}
            >
              {`~:${el.name}`}
            </Typography>
          ) : (
            <></>
          )}
          <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
          >
            {el.message}
          </Typography>
        </Box>
      ) : (
        <Box
          p={1}
          sx={{
            backgroundColor: el.incoming
              ? theme.palette.background.default
              : theme.palette.primary.main,
            borderRadius: 1,
            width: "max-content",
          }}
        >
          <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
          >
            {el.message}
          </Typography>
        </Box>
      )}

      {menu && <MessageOptions />}
    </Stack>
  );
};

const Timeline = ({ el, idx }) => {
  const theme = useTheme();
  return (
    <Stack
      key={idx}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Divider width="46%" />
      <Typography variant="caption" color={theme.palette.text}>
        {el.text}
      </Typography>
      <Divider width="46%" />
    </Stack>
  );
};

const MessageOptions = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <DotsThreeVertical
        size={18}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {Message_options.map((el, i) => {
          return (
            <MenuItem key={i} onClick={handleClick}>
              {el.title}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export { Timeline, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg };
