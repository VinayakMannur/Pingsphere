import React, { useEffect } from "react";
import {
  Box,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Slide,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  CaretLeft,
} from "phosphor-react";
import { faker } from "@faker-js/faker";
import StyledBadge from "../StyleBadge";
import { FirstBarTrue, ToggleSidebar, UpdateContactGroup, UpdateContactNull, UpdateContactOneToOne, UpdateOneToOneChats, updateGroupChats } from "../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import useResponsive from "../../hooks/useResponsive";

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const isMobile = useResponsive("between", "md", "xs", "sm");

  const { to_user_name, to_user_status } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const { groupName, groupAdmin, groupAdminId } = useSelector(
    (state) => state.conversation.group_chat
  );
  const { chat_type } = useSelector((state) => state.app);
  
  const dispatchActions = () => {
    dispatch(UpdateOneToOneChats())
    dispatch(updateGroupChats())
    dispatch(UpdateContactNull())
    dispatch(FirstBarTrue())
  };

  useEffect(() => {
    const handleBackButtonPress = (event) => {
      if (isMobile) {
        event.preventDefault(); // Prevents the default back button behavior
        dispatchActions(); // Dispatch the actions
      }
    };

    window.addEventListener('popstate', handleBackButtonPress);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('popstate', handleBackButtonPress);
    };
  }, [isMobile, dispatchActions]);

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
      <Stack
        alignItems={"center"}
        justifyContent={"space-between"}
        direction={"row"}
        sx={{ width: "100%", height: "100%" }}
      >
        <Stack
          onClick={() => {
            if(!isMobile){
              dispatch(ToggleSidebar());
            }
            if(isMobile && chat_type === "individual"){
              dispatch(UpdateContactOneToOne())
            }
            if(isMobile && chat_type === "group"){
              dispatch(UpdateContactGroup())
            }
          }}
          direction={"row"}
          spacing={2}
        >
          
          <Box>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={faker.name.firstName()} src={faker.image.city()} />
            </StyledBadge>
          </Box>
          <Stack spacing={0.1}>
            {chat_type === "group" ? (
              <>
                <Typography variant="subtitle2">{groupName}</Typography>
                <Typography variant="caption">
                  {`Created by ${groupAdmin}`}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="subtitle2">{to_user_name}</Typography>
                <Typography variant="caption">
                  {to_user_status ? "Online" : "Offline"}
                </Typography>
              </>
            )}
          </Stack>
        </Stack>
        <Stack alignItems={"center"} direction={"row"} spacing={2}>
          <IconButton onClick={()=>{
            if(isMobile){
              dispatchActions()
            }
          }}>
            <CaretLeft/>
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
