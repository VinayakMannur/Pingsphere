import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import SideBar from "../../components/SideBar";
import { useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import { SelectConversation, showSnackbar } from "../../redux/slices/app";
import { useDispatch } from "react-redux";
import { AddDirectMessage, FetchCurrentConversation, FetchGrpChats, UpdateConversationId } from "../../redux/slices/conversation";

const DashboardLayout = () => {
  const dispatch = useDispatch()

  const {isLoggedIn} = useSelector((state) => state.auth)
  const {conversationId} = useSelector((state)=> state.conversation.direct_chat)
  const {groupId} = useSelector((state)=>state.conversation.group_chat)
  const user_id = window.localStorage.getItem("user_id")

  useEffect(()=>{

    if(isLoggedIn){
      window.onload = function () {
        //for connecting with socket instance we are loading once we land on landing page
        if(!window.location.hash){
          window.location = window.location + '#loaded'
          window.location.reload()
        }
      }

      window.onload()

      if(!socket){
        connectSocket(user_id)
      }
      
      socket.on("new_friend_request", (data)=>{
        dispatch(showSnackbar({severity: "success", message: data.message}))
      })
      socket.on("request_accepted", (data)=>{
        dispatch(showSnackbar({severity: "success", message: data.message}))
      })
      socket.on("request_sent", (data)=>{
        dispatch(showSnackbar({severity: "success", message: data.message}))
      })
      socket.on("start_chat", (data)=>{
        console.log(data);
        const name = `${data.toUserDetails.firstName} ${data.toUserDetails.lastName}`
        dispatch(UpdateConversationId({conversationId: data.adding_conversationId.conversationId, to_user: data.toUserDetails.id, to_user_name: name, to_user_status: data.toUserDetails.status}))
        dispatch(FetchCurrentConversation())
        dispatch(SelectConversation())

        // if presence of exisiting conversation
        // if(){
        //   dispatch(UpdateDirectConversation({conversation: data}))
        // }
        // else{
        //   dispatch(AddDirectConversation({conversation: data}))
        // }
      })
      socket.on("new_message", (data)=>{
        console.log(data);
        const id = parseInt(data.message.id)
        const text = data.message.text
        const senderId = parseInt(data.message.senderId)
        if(parseInt(conversationId) === parseInt(data.conversationId)){
          dispatch(showSnackbar({severity: "success", message: data.snack}))
          dispatch(AddDirectMessage({
            id: id,
            type: "msg",
            message: text,
            outgoing: senderId === parseInt(user_id) ,
            incoming: senderId !== parseInt(user_id)
          }))
        }
      })

      socket.on("group_created",(data)=>{
        dispatch(showSnackbar({severity: "success", message: data.message}))
      })

      socket.on("added_to_group",(data)=>{
        dispatch(showSnackbar({severity: "success", message: data.message}))
      })
      
      socket.on("message_from_group", (data)=>{
        dispatch(showSnackbar({severity: "success", message: data.msg}))
        
        socket.emit("get_group_messages",{id: groupId}, (data)=>{
          // console.log(data);
          dispatch(FetchGrpChats(data))
        })
      })
    }

    return () =>{
      socket?.off("new_friend_request")
      socket?.off("request_accepted")
      socket?.off("request_sent")
      socket?.off("start_chat")
      socket?.off("new_message")
      socket?.off("group_created")
      socket?.off("added_to_group")
    }

  },[isLoggedIn, socket])

  if(!isLoggedIn){
    return <Navigate to="auth/login"/>
  }

  return (
    <Stack direction={"row"}>
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
