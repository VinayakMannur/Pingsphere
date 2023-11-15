import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Stack, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getFriendRequests, getFriends, getUsers } from "../redux/slices/app";
import { FriendRequestComponent, FriendsComponent, UserComponent } from "./FriendsComponents";

const UsersList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const { users } = useSelector((state) => state.app);

  return (
    <>
      {users.map((el, idx) => {
        // todo
        return <UserComponent key={el.id} {...el}/>
      })}
    </>
  );
};

const FriendsList = ({handleClose}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriends());
  }, []);

  const { friends } = useSelector((state) => state.app);
  // console.log(friends);
  return (
    <>
      {friends && friends.map((el, idx) => {
        // todo
        return <FriendsComponent key={el.id} {...el} handleClose={handleClose}/>
      })}
    </>
  );
};

const FriendRequestList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendRequests());
  }, []);

  const { friendRequests } = useSelector((state) => state.app);

  // const { requests } = useSelector((state) => state.app);
  // console.log(friendRequests);
  return (
    <>
      {friendRequests && friendRequests.map((el, idx) => {
        //todo should send the actual request id
        return <FriendRequestComponent key={el.id} {...el.senderUsers} rid={el.id}/>
      })
      }
    </>
  );
};

const Friends = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose} keepMounted>
      <Stack p={2} sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Requests" />
        </Tabs>
      </Stack>

      {/* dialog content */}
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2}>
            {(() => {
              switch (value) {
                case 0: //allusers
                  return <UsersList />;
                case 1: //friends
                  return <FriendsList handleClose={handleClose}/>;
                case 2: //requests
                  return <FriendRequestList />;
                default:
                  break;
              }
            })()}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Friends;
