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
  group_chat: {},
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchDirectConversation(state, action) {
      const responseData = action.payload.data;
      // console.log(action.payload);
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
          name: `${el.receiverFirstName} ${el.receiverLastName}`,
          online: el.receiverStatus === "Online",
          img: faker.image.avatar(),
          msg: el.text,
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
      console.log("came in adding direct message", action.payload.message);
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
    }
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
        console.log(response.data.data);
        
    } catch (error) {
        console.error(error);
        
    }
  };
};
