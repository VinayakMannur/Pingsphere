import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT", //shared, stared, conatct
  },
  snackbar: {
    open: false,
    message: null,
    severity: null,
  },
  users: [],
  friends: [],
  // requests: [],
  friendRequests: [],
  chat_type: null,
  room_id: null,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar(state, action) {
      state.sidebar.open = !state.sidebar.open;
    },
    toggleSidebarType(state, action) {
      state.sidebar.type = action.payload.type;
    },
    openSnackbar(state, action) {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    hideSnackbar(state, action) {
      state.snackbar.open = false;
      state.snackbar.severity = null;
      state.snackbar.message = null;
    },
    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateFriends(state, action) {
      state.friends = action.payload.friends;
    },
    // updateRequests(state, action) {
    //   state.requests = action.payload.requests
    // },
    updateFriendRequests(state, action) {
      state.friendRequests = action.payload.requests;
    },
    selectConversation(state, action){
      state.chat_type = "individual"
    },
    updateConversation(state, action){
      state.chat_type = "group"
    }
  },
});

export default slice.reducer;

export function ToggleSidebar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleSidebar());
  };
}

export function UpdateSidebarType(type) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleSidebarType({ type }));
  };
}

export function showSnackbar({ severity, message }) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.openSnackbar({ severity, message }));

    setTimeout(() => {
      dispatch(slice.actions.hideSnackbar());
    }, 4000);
  };
}

export function closeSnackbar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.hideSnackbar());
  };
}

export const getUsers = () => {
  return async (dispatch, getState) => {
    await axios.get("/user/get-users", {
      headers: {
        "Content-type": "application/json",
        authToken: getState().auth.token,
      },
    })
      .then((response) => {
        // console.log(response);
        dispatch(slice.actions.updateUsers({ users: response.data.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getFriends = () => {
  return async (dispatch, getState) => {
    await axios.get("/user/get-friends", {
      headers: {
        "Content-type": "application/json",
        authToken: getState().auth.token,
      },
    })
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.updateFriends({ friends: response.data.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getFriendRequests = () => {
  return async (dispatch, getState) => {
    await axios.get("/user/get-friend-requests", {
      headers: {
        "Content-type": "application/json",
        authToken: getState().auth.token,
      },
    })
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.updateFriendRequests({ requests: response.data.data })
        );
        // dispatch(
        //   slice.actions.updateRequests({ requests: response.data.requests })
        // );
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const SelectConversation = () => {
  return (dispatch, getState) =>{
    dispatch(slice.actions.selectConversation())
  }
}

export const UpdateConversation = () => {
  return (dispatch, getState) =>{
    dispatch(slice.actions.updateConversation())
  }
}