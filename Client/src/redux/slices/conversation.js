import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
import axios from "../../utils/axios";

const user_id = window.localStorage.getItem("user_id")

const initialState = {
  direct_chat: {
    conversations: [],
    current_conversation: null,
    current_message: [],
    conversationId: null,
    to_user: null,
    to_user_name: null,
    to_user_status: null,
  },
  group_chat: {
    groupList: [],
    groupId: null,
    groupName: '',
    groupAdmin: '',
    groupAdminId: null,
    grpConversation: [],
    friendsNGrp: [],
    restrict: false,
    friendsInGrp: [],
    friendsNotAdmin: [],
    newlyAddedAdmins: [],
  },
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchDirectConversation(state, action) {
      const responseData = action.payload.data;
      // console.log("??????????????????????/", responseData);
      const list = responseData.map((el) => {
        // this user must contain the user_id of the other participent not the one who is logged in
        // console.log(el);
        const dateString = el.updatedAt;
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        let formattedHours = hours % 12;
        formattedHours = formattedHours || 12;
        const period = hours >= 12 ? "PM" : "AM";
        const time = `${formattedHours}:${minutes} ${period}`
        return {
          id: el.conversationId,
          user_id: el.receiverId,
          name: `${el.receiver.firstName} ${el.receiver.lastName}`,
          online: el.receiver.status === "Online",
          img: faker.image.city(),
          msg: `${el.text.slice(0, 10)}...`,
          time: time,
          unread: 0,
          pinned: false,
        };
      });

      state.direct_chat.conversations = list;
    },
    fetchCurrentConversation(state, action) {
      const chat_history = action.payload.chat_history.map((el) => {
        return {
          id: el.id,
          type: "msg",
          message: el.text,
          outgoing: el.senderId === parseInt(user_id) ? true: false,
          incoming: el.senderId !== parseInt(user_id) ? true: false,
        };
      });

      state.direct_chat.current_conversation = chat_history;
    },
    addDirectMessage(state, action){
      // console.log("came in adding direct message", action.payload.message);
      state.direct_chat.current_conversation.push(action.payload.message)
    },
    updateConversationId(state, action) {
      state.direct_chat.conversationId = action.payload.conversationId;
      state.direct_chat.to_user = action.payload.to_user;
      state.direct_chat.to_user_name = action.payload.to_user_name;
      state.direct_chat.to_user_status = action.payload.to_user_status;
    },
    emptyCurrentConversation(state, action){
      state.direct_chat.current_conversation = null
    },
    updateGroupList(state, action){
      // console.log(action.payload);
      const {gropInfo , formattedMessages} = action.payload

      const list = gropInfo.map((el, idx)=>{
        const formattedMessage = formattedMessages[idx] || {};
        const dateString = formattedMessage.latestMessage?.createdAt || ''
        const date = dateString ? new Date(dateString) : new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        let formattedHours = hours % 12;
        formattedHours = formattedHours || 12;
        const period = hours >= 12 ? "PM" : "AM";
        const time = `${formattedHours}:${minutes} ${period}`


        return {
          id: el.id,
          img: faker.image.city(),
          name: el.groupName,
          msg: `~${formattedMessage.latestMessage?.sender?.firstName || ''}: ${formattedMessage.latestMessage?.text?.slice(0, 10) || ''}...`,
          time: time,
          unread: 0,
          pinned: false,
          online: true,
        }
      })
      state.group_chat.groupList = list
    },
    updateGrpNameAdmin(state, action){
      state.group_chat.groupId = action.payload.groupId
      state.group_chat.groupName = action.payload.groupName
      state.group_chat.groupAdmin = action.payload.groupAdmin
      state.group_chat.groupAdminId = action.payload.groupAdminId
    },
    pushToGrpConversation(state, action){
      // console.log(action.payload);
      state.group_chat.grpConversation.push(action.payload)
    },
    fetchGrpChats(state, action){
      // console.log(action.payload);
      const chat_history = action.payload.map((el) => {
        return {
          id: el.id,
          user_id: el.user.id,
          name: `${el.user.firstName} ${el.user.lastName}`,
          type: "msg",
          message: el.text,
          outgoing: el.senderId === parseInt(user_id) ? true: false,
          incoming: el.senderId !== parseInt(user_id) ? true: false,
        };
      });
      state.group_chat.grpConversation = chat_history
    },
    friendsNotInGrp(state, action){
      // console.log(action.payload);
      state.group_chat.friendsNGrp = action.payload
    },
    restrictMembers(state, action){
      state.group_chat.restrict = !state.group_chat.restrict
    },
    fetchFriendsInGroup(state, action){
      state.group_chat.friendsInGrp = action.payload
    },
    emptyGrpConversations(state, action){
      state.group_chat.grpConversation = []
      state.group_chat.groupId= null
      state.group_chat.groupAdmin = ''
      state.group_chat.groupAdminId = null
      state.group_chat.restrict = true
    },
    fetchFriendsNotAdmin(state, action){
      state.group_chat.friendsNotAdmin = action.payload
    },
    newlyAddedAdmins(state, action){
      state.group_chat.newlyAddedAdmins = action.payload
    },
  },
});

export default slice.reducer;

export const FetchDirectConversation = ({ data }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchDirectConversation({ data }));
  };
};

export const UpdateConversationId = ({ conversationId, to_user, to_user_name, to_user_status  }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateConversationId({ conversationId, to_user, to_user_name, to_user_status  }));
    dispatch(FetchCurrentConversation())
  };
};

export const AddDirectMessage =(message) =>{
  return async(dispatch, getState) =>{
    dispatch(slice.actions.addDirectMessage({message}))
  }
}

export const EmptyCurrentConversation = () =>{
  return (dispatch, getState)=>{
    dispatch(slice.actions.emptyCurrentConversation())
  }
}

export function FetchCurrentConversation(){
  return async (dispatch, getState) => {
    try {
      const conversationId = getState().conversation.direct_chat.conversationId;
      const authToken = getState().auth.token;

      const response = await axios.get("/msg/get-messages", {
          params: {
            conversationId: conversationId
          },
          headers: {
            "Content-Type": "application/json",
            "authToken": authToken
          }
      });
      dispatch(slice.actions.fetchCurrentConversation({chat_history: response.data.data}))
      // console.log(response.data.data); 
    } catch (error) {
      console.error(error); 
    }
  };
};

export const UpdateGroupList = (data) =>{
  return async (dispatch, getState) => {
    // console.log(data);
    dispatch(slice.actions.updateGroupList(data));
  };
}

export const UpdateGrpNameAdmin = ({groupId, groupName, groupAdmin, groupAdminId}) => {
  return async (dispatch, getState)=>{
    dispatch(slice.actions.updateGrpNameAdmin({groupId, groupName, groupAdmin, groupAdminId}))
  }
}

export const PushToGrpConversation = (data) =>{
  return async (dispatch, getState) => {
    dispatch(slice.actions.pushToGrpConversation(data))
  }
}

export const FetchGrpChats = (data) =>{
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchGrpChats(data))
  }
}

export const FriendsNotInGrp = (data) =>{
  return async(dispatch, getState) =>{
    dispatch(slice.actions.friendsNotInGrp(data))
  }
}

export function RestrictMembers (){
  return async(dispatch, getState)=>{
    dispatch(slice.actions.restrictMembers())
  }
}

export const FetchFriendsInGroup = (data) =>{
  return async(dispatch, getState)=>{
    dispatch(slice.actions.fetchFriendsInGroup(data))
  }
}

export function EmptyGrpConversations(){
  return async(dispatch, getState)=>{
    dispatch(slice.actions.emptyGrpConversations())
  }
}

export const FetchFriendsNotAdmin = (data) =>{
  return async(dispatch, getState)=>{
    dispatch(slice.actions.fetchFriendsNotAdmin(data))
  }
}

export const NewlyAddedAdmins = (data) =>{
  return async(dispatch, getState)=>{
    dispatch(slice.actions.newlyAddedAdmins(data))
  }
}


// export function CreateGroup({groupName, selectedMembers}){
//   return async(dispatch, getState) => {
//     try {
//       const authToken = getState().auth.token;
//       const response = await axios.post("/group/create-group",{
//         groupName,
//         selectedMembers
//       },{
//         headers: {
//           "Content-Type": "application/json",
//           "authToken": authToken
//         }
//       })
//       console.log(response);
//     } catch (error) {
//       console.error(error); 
//     }
//   }
// }
