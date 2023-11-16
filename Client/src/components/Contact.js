import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Bell, CaretRight, Prohibit, Star, Trash, UserCircleGear, UserCircleMinus, UserCirclePlus, X } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { ToggleSidebar, UpdateContactInfo, UpdateContactNull, UpdateGroupInfo, UpdateSidebarType } from "../redux/slices/app";
import { faker } from "@faker-js/faker";
import { socket } from "../socket";
import useResponsive from "../hooks/useResponsive";
import { FetchFriendsInGroup, FetchFriendsNotAdmin, FriendsNotInGrp } from "../redux/slices/conversation";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog = ({ open, handleClose }) => {

  const { groupId, groupName } = useSelector(
    (state) => state.conversation.group_chat
  );
  const user_id = parseInt(window.localStorage.getItem("user_id"))

  const handleSubmit = () => {
    // console.log("Selected Members:", selectedMembers);
    socket.emit("self_remove_from_group", { groupName, user_id, groupId });
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
      <DialogTitle>Exit from group</DialogTitle>
      <DialogContent>
        <div id="alert-dialog-slide-description">
          Are you sure you want to exit from group?
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

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
        <div id="alert-dialog-slide-description">
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
        </div>
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
        <div id="alert-dialog-slide-description">
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
        </div>
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
        <div id="alert-dialog-slide-description">
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
        </div>
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


const Contact = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [openBlock, setOpenBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddMembers, setOpenAddMembers] = useState(false);
  const [openRemoveMembers, setOpenRemoveMembers] = useState(false);
  const [openNotAdminMembers, setOpenNotAdminMembers] = useState(false);
  const {to_user} = useSelector((state)=> state.conversation.direct_chat)
  const {groupId} = useSelector((state)=> state.conversation.group_chat)
  const { chat_type } = useSelector((store) => store.app);
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const user_id = parseInt(window.localStorage.getItem("user_id"))

  useEffect(()=>{
    if(chat_type === "individual"){
      socket.emit("get_user_details", {to_user, user_id}, (data)=>{
        // console.log(data);
        dispatch(UpdateContactInfo(data))
      })
    }
    else{
      socket.emit("get_group_details", {groupId}, (data)=>{
        // console.log(data);
        dispatch(UpdateGroupInfo(data))
      })
    }
    
  },[])

  const {name, phoneNumber, groupsInCommon} = useSelector((state)=> state.app.contactInfo)
  const {createdBy, id, grpName, users} = useSelector((state)=> state.app.groupInfo)
  const {groupAdmin, newlyAddedAdmins} = useSelector((state)=> state.conversation.group_chat)

  const handleCloseBlock = () => {
    setOpenBlock(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseAddMembersDialog = () => {
    setOpenAddMembers(false);
  };

  const handleCloseRemoveMembersDialog = () => {
    setOpenRemoveMembers(false);
  };

  const handleCloseFriendsNotDialog = () => {
    setOpenNotAdminMembers(false);
  };

  return (
    <Box sx={{ width: isMobile ? "100%":  320, height: "100vh" }}>
      <Stack width={"100%"} height={"100%"}>
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.paper,
          }}
        >
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle2">{chat_type === "individual" ? "Contact Info": "Group Info"}</Typography>
            <IconButton
              onClick={() => {
                dispatch(ToggleSidebar());
                if(isMobile){
                  dispatch(UpdateContactNull())
                }
              }}
              
            >
              <X />
            </IconButton>
          </Stack>
        </Box>
        {/* body */}
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "0.4em",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
          p={1}
          spacing={2}
        >
          <Stack alignItems={"center"} direction={"row"} p={1} spacing={4}>
            <Avatar
              alt={faker.name.firstName()}
              src={faker.image.avatar()}
              sx={{ height: 64, width: 64 }}
            />

            <Stack direction={"column"} spacing={0.5}>
              <Typography variant="article">
                {chat_type === "individual" ? name: grpName}
              </Typography>
              <Typography variant="body2">{chat_type === "individual" ? phoneNumber: `Created by ${groupAdmin}`}</Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack px={1} spacing={0.5}>
            <Typography variant="subtitle2">About</Typography>
            <Typography variant="body2">Hell yaa!!!!!!!!!!</Typography>
          </Stack>
          <Divider />
          {chat_type === "group" && newlyAddedAdmins.includes(parseInt(user_id))? 
            <>
              <Stack
                direction={"row"}
                alignItems={"center"}
                px={1}
                justifyContent={"space-between"}
              >
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Typography variant="subtitle2">Make Members Admin</Typography>
                </Stack>
                <IconButton
                  onClick={() => {
                    setOpenNotAdminMembers(true)
                  }}
                >
                  <UserCircleGear size={22}
                    style={{ color: theme.palette.primary.main }}
                  />
                </IconButton>
              </Stack>
              <Divider />
              <Stack
                direction={"row"}
                alignItems={"center"}
                px={1}
                justifyContent={"space-between"}
              >
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Typography variant="subtitle2">Add Members</Typography>
                </Stack>
                <IconButton
                  onClick={() => {
                    setOpenAddMembers(true);
                  }}
                >
                  <UserCirclePlus
                    size={22}
                    style={{ color: theme.palette.primary.main }}
                  />
                </IconButton>
              </Stack>
              <Divider />
              <Stack
                direction={"row"}
                alignItems={"center"}
                px={1}
                justifyContent={"space-between"}
              >
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Typography variant="subtitle2">Remove Members</Typography>
                </Stack>
                <IconButton onClick={()=>{
                  setOpenRemoveMembers(true)
                }}>
                  <UserCircleMinus size={22}
                    style={{ color: theme.palette.primary.main }}
                  />
                </IconButton>
              </Stack>
              <Divider/>
            </>
            : <></>}
            
          
          {chat_type === "individual" ? 
            <>
              <Typography px={1} variant="body2">
                Groups in common
              </Typography>
              {groupsInCommon.length > 0 ? groupsInCommon.map((grp)=>(
                <Stack key={grp.id} direction={"row"} px={1} spacing={2} alignItems={"center"}>
                  <Avatar alt={faker.name.firstName()} src={faker.image.avatar()} />
                  <Stack>
                    <Typography variant="subtitle2">{grp.groupName}</Typography>
                  </Stack>
                </Stack>
              )):<></>}  
            </>
              :
            <>
              <Typography px={1} variant="body2">
                Members
              </Typography>
              {users.length > 0 ? users.map((user)=>(
                <Stack key={user.id} direction={"row"} px={1} spacing={2} alignItems={"center"}>
                  <Avatar alt={faker.name.firstName()} src={faker.image.avatar()} />
                  <Stack>
                    {user.id === user_id? <Typography variant="subtitle2">You</Typography>:
                    <Typography variant="subtitle2">{`${user.firstName} ${user.lastName}`}</Typography>}
                  </Stack>
                  <Box sx={{ marginLeft: 'auto' }} />
                  {newlyAddedAdmins.includes(parseInt(user.id)) && 
                  <Badge anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }} badgeContent="Admin" color="primary"/>}
                  
                </Stack>
              )):<></>}  
            </>
          }
          {chat_type === "group" ? 
            <>
              <Divider />
              <Stack direction={"row"} px={1} alignItems={"center"} spacing={2}>
                <Button
                  onClick={() => {
                    setOpenDelete(true);
                  }}
                  fullWidth
                  startIcon={<Trash />}
                  variant="outlined"
                >
                  Exit from group
                </Button>
              </Stack>
          </>
          :<></>}
          
        </Stack>
      </Stack>
      
      {openDelete && <DeleteDialog open={openDelete} handleClose={handleCloseDelete}/>}
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

export default Contact;
