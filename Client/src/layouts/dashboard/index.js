import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import SideBar from "../../components/SideBar";
import { useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import { SelectConversation, UpdateContactNull, UpdateToOneToOneConversation, showSnackbar, updateGroupChats } from "../../redux/slices/app";
import { useDispatch } from "react-redux";
import { AddDirectMessage, EmptyGrpConversations, FetchCurrentConversation, FetchGrpChats, NewlyAddedAdmins, UpdateConversationId } from "../../redux/slices/conversation";
import useResponsive from "../../hooks/useResponsive";

const DashboardLayout = () => {
  const dispatch = useDispatch()

  const {isLoggedIn} = useSelector((state) => state.auth)
  const {firstBar} = useSelector((state) => state.app)
  const {conversationId} = useSelector((state)=> state.conversation.direct_chat)
  // const {groupId} = useSelector((state)=>state.conversation.group_chat)
  // const user_id = parseInt(window.localStorage.getItem("user_id"))
  const isMobile = useResponsive("between", "md", "xs", "sm");
  // console.log("fuckkkkkkkkkk id ", groupId);
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
      const user_id = parseInt(window.localStorage.getItem("user_id"))
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
        // console.log(data);
        const name = `${data.toUserDetails.firstName} ${data.toUserDetails.lastName}`
        dispatch(UpdateConversationId({conversationId: data.adding_conversationId.conversationId, to_user: data.toUserDetails.id, to_user_name: name, to_user_status: data.toUserDetails.status}))
        dispatch(FetchCurrentConversation())
        dispatch(SelectConversation())
        dispatch(UpdateToOneToOneConversation())

        // if presence of exisiting conversation
        // if(){
        //   dispatch(UpdateDirectConversation({conversation: data}))
        // }
        // else{
        //   dispatch(AddDirectConversation({conversation: data}))
        // }
      })

      socket.on("start_chat_error",(data)=>{
        dispatch(showSnackbar({severity: "warning", message: data.msg}))
      })

      socket.on("new_message", (data)=>{
        // console.log(data);
        const id = parseInt(data.message.id)
        const text = data.message.text
        const senderId = parseInt(data.message.senderId)
        const Image = data.message.Image
        const Document = data.message.Document
        const result = ((Image && "img") || (Document && "doc")) || "msg";
        if(parseInt(conversationId) === parseInt(data.conversationId)){
          // console.log("severity: \\message: data.snack}");
          dispatch(showSnackbar({severity: "success", message: data.snack}))
          dispatch(AddDirectMessage({
            id: id,
            type: result,
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
        // console.log("added_to_group", data);
        dispatch(showSnackbar({severity: "success", message: data.message}))
      })

      socket.on("removed_from_group", (data)=>{
        dispatch(showSnackbar({severity: "success", message: data.message}))
        dispatch(EmptyGrpConversations())
        if(isMobile){
          dispatch(updateGroupChats())
          dispatch(UpdateContactNull())
        }
      })
      
      socket.on("message_from_group", (data)=>{
        dispatch(showSnackbar({severity: "success", message: data.msg}))
        // console.log("not going id ", groupId);
        socket.emit("get_group_messages",{id: data.groupId}, (data)=>{
          // console.log(data);
          dispatch(FetchGrpChats(data.grpMessages))
        })
      })

      socket.on("restrict", (data)=>{
        console.log("restrict");
      })

      socket.on("made_admin", (data)=>{
        dispatch(showSnackbar({severity: "success", message: data.message}))
        dispatch(NewlyAddedAdmins(data.admins))
      })
    }

    return () =>{
      socket?.off("new_friend_request")
      socket?.off("request_accepted")
      socket?.off("request_sent")
      socket?.off("start_chat")
      socket?.off("start_chat_error")
      socket?.off("new_message")
      socket?.off("group_created")
      socket?.off("added_to_group")
      socket?.off("removed_from_group")
      socket?.off("message_from_group")
      socket?.off("made_admin")
    }

  },[isLoggedIn, socket])

  if(!isLoggedIn){
    return <Navigate to="auth/login"/>
  }

  return (
    <Stack direction={"row"}>
      {isMobile && firstBar ? <SideBar />: <></>}
      {!isMobile && <SideBar />}
      
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
