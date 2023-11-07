// import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    direct_chat: {
        conversations: [],
        current_conversation: null,
        current_message: [],
    },
    group_chat: {}
}

const slice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        fetchDirectConversation(state, action){
            // const list = action.payload.conversation.map((el)=>{
            //     const this_user = el

                //this user must contain the user_id of the other participent not the one who is logged in

                // return {
                //     id: el.id,
                //     user_id: this_user.id,
                //     name: `${this_user.firstName} ${this_user.lastName}`,
                //     online: this_user.status === "online",
                //     img: faker.image.avatar(),
                //     msg: faker.music.songName(),
                //     time: "9:34",
                //     unread: 0,
                //     pinned: false,
                // }
            // })

            // state.direct_chat.conversations = list
            
        }
    }
})

export default slice.reducer

export const FetchDirectConversation = ({conversation}) =>{
    return async (dispatch, getState)=>{
        dispatch(slice.actions.fetchDirectConversation({conversation}))
    }
}