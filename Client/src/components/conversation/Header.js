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
  CaretLeft,
  LockLaminated,
  MagnifyingGlass,
  Phone,
  Plus,
  UserCircleGear,
  UserCircleMinus,
  UserCirclePlus,
  VideoCamera,
} from "phosphor-react";
import { faker } from "@faker-js/faker";
import StyledBadge from "../StyleBadge";
import { FirstBarTrue, ToggleSidebar, UpdateContactGroup, UpdateContactNull, UpdateContactOneToOne, UpdateOneToOneChats, updateGroupChats } from "../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import { FetchFriendsInGroup, FetchFriendsNotAdmin, FriendsNotInGrp, RestrictMembers } from "../../redux/slices/conversation";
import useResponsive from "../../hooks/useResponsive";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddMembersDialog = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { groupId, groupName } = useSelector(
    (state) => state.conversation.group_chat
  );
  const user_id = parseInt(window.localStorage.getItem("user_id"))

  useEffect(() => {
    socket.emit("get_friends_not_paart_of_group", { groupId, user_id }, (data) => {
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

const MakeAdminsDialog = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { groupId, groupName } = useSelector(
    (state) => state.conversation.group_chat
  );

  useEffect(() => {
    socket.emit("get_friends_who_are_not_admin", { groupId }, (data) => {
      // console.log(data);
      dispatch(FetchFriendsNotAdmin(data))
    });
  }, []);

  const { friendsNotAdmin } = useSelector((state) => state.conversation.group_chat);

  const handleSubmit = () => {
    // console.log("Selected Members:", selectedMembers);
    socket.emit("make_admin", { groupName, selectedMembers, groupId });
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
      <DialogTitle>Make Admins of group</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Stack mt={2} spacing={3} sx={{ width: 500 }}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={friendsNotAdmin}
              getOptionLabel={(option) =>
                `${option.firstName} ${option.lastName}`
              }
              filterSelectedOptions
              onChange={(event, newValue) => setSelectedMembers(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Make admins of the group"
                  placeholder="Make Admins"
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

const RemoveMembersDialog = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { groupId, groupName } = useSelector(
    (state) => state.conversation.group_chat
  );
  const user_id = parseInt(window.localStorage.getItem("user_id"))

  useEffect(() => {
    socket.emit("get_members_of_group", { groupId, user_id }, (data) => {
      // console.log(data);
      dispatch(FetchFriendsInGroup(data))
    });
  }, []);

  const { friendsInGrp } = useSelector((state) => state.conversation.group_chat);


  const handleSubmit = () => {
    // console.log("Selected Members:", selectedMembers);
    socket.emit("remove_from_group", { groupName, selectedMembers, groupId });
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
      <DialogTitle>Remove Members from group</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Stack mt={2} spacing={3} sx={{ width: 500 }}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={friendsInGrp}
              getOptionLabel={(option) =>
                `${option.firstName} ${option.lastName}`
              }
              filterSelectedOptions
              onChange={(event, newValue) => setSelectedMembers(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Remove Members from group"
                  placeholder="Remove Members"
                />
              )}
            />
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button type="submit" onClick={handleSubmit} variant="contained">
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [openAddMembers, setOpenAddMembers] = useState(false);
  const [openRemoveMembers, setOpenRemoveMembers] = useState(false);
  const [openNotAdminMembers, setOpenNotAdminMembers] = useState(false);
  const user_id = window.localStorage.getItem("user_id");
  const { groupId, newlyAddedAdmins } = useSelector(
    (state) => state.conversation.group_chat
  );
  const isMobile = useResponsive("between", "md", "xs", "sm");

  const handleCloseAddMembersDialog = () => {
    setOpenAddMembers(false);
  };

  const handleCloseRemoveMembersDialog = () => {
    setOpenRemoveMembers(false);
  };

  const handleCloseFriendsNotDialog = () => {
    setOpenNotAdminMembers(false);
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
              dispatch(UpdateOneToOneChats())
              dispatch(updateGroupChats())
              dispatch(UpdateContactNull())
              dispatch(FirstBarTrue())
            }
          }}>
            <CaretLeft/>
          </IconButton>
        </Stack>
      </Stack>
      {openAddMembers && (
        <AddMembersDialog
          open={openAddMembers}
          handleClose={handleCloseAddMembersDialog}
        />
      )}
      {openRemoveMembers && (
        <RemoveMembersDialog
          open={openRemoveMembers}
          handleClose={handleCloseRemoveMembersDialog}
        />
      )}
      {openNotAdminMembers && (
        <MakeAdminsDialog
          open={openNotAdminMembers}
          handleClose={handleCloseFriendsNotDialog}
        />
      )}
    </Box>
  );
};

export default Header;
