import React, { useState } from "react";
import {
  Avatar,
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
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Bell, CaretRight, Prohibit, Star, Trash, X } from "phosphor-react";
import { useDispatch } from "react-redux";
import { ToggleSidebar, UpdateSidebarType } from "../redux/slices/app";
import { faker } from "@faker-js/faker";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Block this contact</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
        Are you sure you want to block this contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Delete this chat</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this chat?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

const Contact = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [openBlock, setOpenBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseBlock = () => {
    setOpenBlock(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <Box sx={{ width: 320, height: "100vh" }}>
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
            <Typography variant="subtitle2">Contact Info</Typography>
            <IconButton
              onClick={() => {
                dispatch(ToggleSidebar());
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
                {faker.name.firstName()}
              </Typography>
              <Typography variant="body2">7353352894</Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack px={1} spacing={0.5}>
            <Typography variant="subtitle2">About</Typography>
            <Typography variant="body2">Hell yaa!!!!!!!!!!</Typography>
          </Stack>
          <Divider />
          <Stack
            px={1}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle2">Media, Links & Docs</Typography>
            <Button
              onClick={() => {
                dispatch(UpdateSidebarType("SHARED"));
              }}
              endIcon={<CaretRight />}
            >
              20
            </Button>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} px={1} spacing={1}>
            {[1, 2, 3].map((el) => {
              return (
                <Box>
                  <img src={faker.image.food()} alt={faker.name.firstName()} />
                </Box>
              );
            })}
          </Stack>
          <Divider />
          <Stack
            direction={"row"}
            alignItems={"center"}
            px={1}
            justifyContent={"space-between"}
          >
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <Star size={20} />
              <Typography variant="subtitle2">Starred Messages</Typography>
            </Stack>
            <IconButton
              onClick={() => {
                dispatch(UpdateSidebarType("STARRED"));
              }}
            >
              <CaretRight />
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
              <Bell size={20} />
              <Typography variant="subtitle2">Mute Notifications</Typography>
            </Stack>
            <IconButton>
              <Switch />
            </IconButton>
          </Stack>
          <Divider />
          <Typography px={1} variant="body2">
            1 group in common
          </Typography>
          <Stack direction={"row"} px={1} spacing={2} alignItems={"center"}>
            <Avatar alt={faker.name.firstName()} src={faker.image.avatar()} />
            <Stack>
              <Typography variant="subtitle2">Help</Typography>
              <Typography variant="body2">Cat, Dog, noting, You</Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack direction={"row"} px={1} alignItems={"center"} spacing={2}>
            <Button
              onClick={() => {
                setOpenBlock(true);
              }}
              fullWidth
              startIcon={<Prohibit />}
              variant="outlined"
            >
              Block
            </Button>
            <Button
              onClick={() => {
                setOpenDelete(true);
              }}
              fullWidth
              startIcon={<Trash />}
              variant="outlined"
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {openBlock && <BlockDialog open={openBlock} handleClose={handleCloseBlock}/>}
      {openDelete && <DeleteDialog open={openDelete} handleClose={handleCloseDelete}/>}
    </Box>
  );
};

export default Contact;
