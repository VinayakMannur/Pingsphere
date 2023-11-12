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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  CaretDown,
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
import { FriendsNotInGrp } from "../../redux/slices/conversation";

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
  const [selectedMembers, setSelectedMembers] = useState([]);
  const user_id = window.localStorage.getItem("user_id");
  const {groupId, groupName} = useSelector((state)=>state.conversation.group_chat)

 
  useEffect(()=>{
    socket.emit("get_friends_not_paart_of_group",{groupId},(data)=>{
      // console.log(data);
      dispatch(FriendsNotInGrp(data))
    })
  },[])

  const {friendsNGrp} = useSelector((state)=>state.conversation.group_chat)

  const handleSubmit = () => {
    // console.log("Selected Members:", selectedMembers);
    socket.emit("add_to_group", {groupName, selectedMembers, groupId})
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

  const handleCloseCreateGroupDialog = () => {
    setOpenCreateGroup(false);
  };

  const { to_user_name, to_user_status } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const { groupName, groupAdmin } = useSelector(
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
          {chat_type === "group" ? (
            <IconButton
              onClick={() => {
                setOpenCreateGroup(true);
              }}
            >
              <Plus size={20} style={{ color: theme.palette.primary.main }} />
            </IconButton>
          ) : (
            <IconButton>
              <VideoCamera />
            </IconButton>
          )}

          <IconButton>
            <Phone />
          </IconButton>
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
