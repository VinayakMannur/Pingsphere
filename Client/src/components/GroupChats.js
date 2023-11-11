import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { ChatList } from "../data";
import { SimpleBarStyle } from "./Scrollbar";
import { Search, SearchIconWrapper, StyledInputBase } from "./search";
import ChatElement from "./ChatElement";
import useResponsive from "../hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import { CreateGroup } from "../redux/slices/conversation";
import { socket } from "../socket";
import { getFriends } from "../redux/slices/app";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MEMBERS = [
  { title: "The Shawshank Redemption", year: 1994, },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
];

const CreateGroupDialog = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const user_id = window.localStorage.getItem("user_id")

  useEffect(()=>{
    dispatch(getFriends());
  },[])

  const { friends } = useSelector((state) => state.app);
  // console.log(friends);

  const handleSubmit = () => {
    // console.log("Group Name:", groupName);
    // console.log("Selected Members:", selectedMembers);
    socket.emit("create_group", {groupName, selectedMembers, user_id: parseInt(user_id)})
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
      <DialogTitle>Create Group</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Stack mt={2} spacing={3} sx={{ width: 500 }}>
            <Typography variant="body2">
              Enter the group name and the members
            </Typography>
            <TextField
              required
              id="groupname"
              label="Group Name"
              variant="outlined"
              onChange={(e) => setGroupName(e.target.value)}
            />
        
            <Autocomplete
              multiple
              id="tags-outlined"
              options={friends}
              getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
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
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const GroupChats = () => {
  const theme = useTheme();
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const isMobile = useResponsive("between", "md", "xs", "sm");

  const handleCloseCreateGroupDialog = () => {
    setOpenCreateGroup(false);
  };
  
  const {groupList} = useSelector((state)=> state.conversation.group_chat)

  return (
    <Box
      sx={{
        position: "relative",
        width: isMobile ? "100%" : 320,
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h5">Group Chats</Typography>
        </Stack>
        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search..." />
          </Search>
        </Stack>
        <Stack spacing={1}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="body2" component={Link}>
              Create new group
            </Typography>
            <IconButton
              onClick={() => {
                setOpenCreateGroup(true);
              }}
            >
              <Plus size={20} style={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Stack>
          <Divider />
        </Stack>
        <Stack
          direction={"column"}
          spacing={1.2}
          sx={{
            height: "100%",
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
        >
          <SimpleBarStyle timeout={500} clickOnTrack={false}>
            {/* <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ color: "#767676" }}>
                Pinned
              </Typography>
              {ChatList.filter((el) => el.pinned).map((el) => {
                return <ChatElement {...el} />;
              })}
            </Stack> */}
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ color: "#767676" }}>
                All Groups
              </Typography>
              {groupList.filter((el) => !el.pinned).map((el) => {
                return <ChatElement {...el} />;
              })}
            </Stack>
          </SimpleBarStyle>
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

export default GroupChats;
