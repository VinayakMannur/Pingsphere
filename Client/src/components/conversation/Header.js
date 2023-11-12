import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Autocomplete,
  DialogActions,
  Button,
  TextField,
  Slide,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  CaretDown,
  LockLaminated,
  MagnifyingGlass,
  Phone,
  Plus,
  VideoCamera,
} from "phosphor-react";
import { faker } from "@faker-js/faker";
import StyledBadge from "../StyleBadge";
import { ToggleSidebar } from "../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import { FriendsNotInGrp, RestrictMembers } from "../../redux/slices/conversation";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroupDialog = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { groupId, groupName } = useSelector(
    (state) => state.conversation.group_chat
  );

  useEffect(() => {
    socket.emit("get_friends_not_paart_of_group", { groupId }, (data) => {
      // console.log(data);
      dispatch(FriendsNotInGrp(data));
    });
  }, []);

  const { friendsNGrp } = useSelector((state) => state.conversation.group_chat);

  const handleSubmit = () => {
    // console.log("Selected Members:", selectedMembers);
    socket.emit("add_to_group", { groupName, selectedMembers, groupId });
    handleClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Add Members to group</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Stack mt={2} spacing={3} sx={{ width: 500 }}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={friendsNGrp}
              getOptionLabel={(option) =>
                `${option.firstName} ${option.lastName}`
              }
              filterSelectedOptions
              onChange={(event, newValue) => setSelectedMembers(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add Members to your group"
                  placeholder="Add Members"
                />
              )}
            />
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button type="submit" onClick={handleSubmit} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const user_id = window.localStorage.getItem("user_id");
  const { groupId } = useSelector(
    (state) => state.conversation.group_chat
  );

  const handleCloseCreateGroupDialog = () => {
    setOpenCreateGroup(false);
  };

  const { to_user_name, to_user_status } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const { groupName, groupAdmin, groupAdminId } = useSelector(
    (state) => state.conversation.group_chat
  );
  const { chat_type } = useSelector((state) => state.app);
  // console.log(chat_type, groupName, groupAdmin);
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
            dispatch(ToggleSidebar());
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
              <Avatar alt={faker.name.firstName()} src={faker.image.avatar()} />
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
          {chat_type === "group" && parseInt(user_id) === groupAdminId ? (
            <>
              <Tooltip title="Add users to group">
                <IconButton
                  onClick={() => {
                    setOpenCreateGroup(true);
                  }}
                >
                  <Plus
                    size={20}
                    style={{ color: theme.palette.primary.main }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Restrict members from texting">
                <IconButton onClick={()=>{
                  // dispatch(RestrictMembers())
                  // socket.emit("restrict_user", {groupId})
                }}>
                  <LockLaminated />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <IconButton>
                <VideoCamera />
              </IconButton>
              <IconButton>
                <Phone />
              </IconButton>
            </>
          )}

          <IconButton>
            <MagnifyingGlass />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton>
            <CaretDown />
          </IconButton>
        </Stack>
      </Stack>
      {openCreateGroup && (
        <CreateGroupDialog
          open={openCreateGroup}
          handleClose={handleCloseCreateGroupDialog}
        />
      )}
    </Box>
  );
};

export default Header;
