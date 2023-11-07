import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import SideBar from "../../components/SideBar";
import { useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import { showSnackbar } from "../../redux/slices/app";
import { useDispatch } from "react-redux";

const DashboardLayout = () => {
  const dispatch = useDispatch()

  const {isLoggedIn} = useSelector((state) => state.auth)

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
    }

    return () =>{
      socket.off("new_friend_request")
      socket.off("request_accepted")
      socket.off("request_sent")
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
