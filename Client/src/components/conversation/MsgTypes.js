import React from "react";
import {
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {  DownloadSimple, Image } from "phosphor-react";
import { useSelector } from "react-redux";
import useResponsive from "../../hooks/useResponsive";

const DocMsg = ({ el, idx }) => {
  const theme = useTheme();
  const { chat_type } = useSelector((state) => state.app);
  const user_id = window.localStorage.getItem("user_id");

  const downloadDoc = (message) => {
    var a = document.createElement("a");
    a.href = message;
    a.target = "_blank"
    a.click();
  }

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
            <Typography variant="caption">Abstract.pdf</Typography>
            <IconButton onClick={()=>{
              downloadDoc(el.message)
            }}>
              <DownloadSimple />
            </IconButton>
          </Stack>
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
            <Typography variant="caption">Abstract.pdf</Typography>
            <IconButton onClick={()=>{
              downloadDoc(el.message)
            }}>
              <DownloadSimple />
            </IconButton>
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

const MediaMsg = ({ el, idx }) => {
  const theme = useTheme();
  const { chat_type } = useSelector((state) => state.app);
  const user_id = window.localStorage.getItem("user_id");
  const isMobile = useResponsive("between", "md", "xs", "sm");
  
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
          <img
            src={el.message}
            alt={""}
            style={{ maxHeight: isMobile?110: 210, maxWidth: isMobile?110:  210, borderRadius: "10px" }}
          />
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
          <img
            src={el.message}
            alt={"image"}
            style={{ maxHeight: isMobile? 110: 210, maxWidth: isMobile? 110: 210, borderRadius: "10px" }}
          />
        </Box>
      )}
    </Stack>
  );
};

const TextMsg = ({ el, idx }) => {
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
    </Stack>
  );
};

export { TextMsg, MediaMsg, DocMsg };
