import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Avatar,
  Stack,
  Typography,
  Input,
  Button,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import { useTheme } from "@mui/material/styles";
import { Camera, CaretLeft } from "phosphor-react";
import ProfileForm from "../../components/forms/ProfileForm";
import useResponsive from "../../hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateOneToOneChats,
  UpdateProfile,
  UpdateSelfInfo,
} from "../../redux/slices/app";
import { socket } from "../../socket";
import axios from "axios";

const Profile = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const user_id = parseInt(window.localStorage.getItem("user_id"));
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    socket.emit("get_self_info", { user_id }, (data) => {
      // console.log(data);
      dispatch(UpdateSelfInfo(data));
    });
  }, []);

  const { name, email, phoneNumber } = useSelector(
    (state) => state.app.selfInfo
  );

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
    
  //   // console.log(selectedFile);


  // };

  // const logFormData = (formData) => {
  //   console.log("Logging FormData synchronously:", formData);
  // };

  // const handleUpload =  (e) => {
  //   e.preventDefault()
  //   // Handle the file upload logic (e.g., send the file to the server)
  //   if (selectedFile) {
     
  //     const formData = new FormData();
  //     formData.append("filee", selectedFile);
      
      
  //     console.log("Uploading file2:", selectedFile);
  //     logFormData(formData);
  //      axios.post("http://localhost:5000/user/upload",{
  //       file: selectedFile
  //     }, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //       .then((response) => {
  //         console.log(response);
  
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
     
 
  //     // setTimeout(() => {
  //     //   // Dispatch the action
  //       console.log(selectedFile);
  //     // }, 2000);
  //     // dispatch(UpdateProfile(selectedFile));
  //     // Implement your upload logic here
  //     // try {
       
  //     // } catch (error) {
  //     //   console.log(error);
  //     // }
  //   }
    
  // };

  return (
    <>
      <Stack direction={"row"} width={"100%"}>
        {/* left */}
        <Box
          sx={{
            width: isMobile ? "100%" : 320,
            height: "100vh",
            // overflow: "scroll",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.paper,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
            {/* header */}
            <Stack spacing={2} direction={"row"} alignItems={"center"}>
              <IconButton
                onClick={() => {
                  dispatch(UpdateOneToOneChats());
                }}
              >
                <CaretLeft size={24} color="#4B4B4B" />
              </IconButton>
              <Typography variant="h5">Profile</Typography>
            </Stack>

            {/* form */}
            {/* <ProfileForm/> */}
            {/* <form onSubmit={handleUpload}> */}
              <Stack
                elevation={3}
                alignItems={"center"}
                sx={{
                  padding: 2,
                  position: "relative",
                  maxWidth: 300,
                  margin: "auto",
                }}
              >
                <Stack position="relative" alignItems="flex-end">
                  <Avatar
                    alt={faker.name.firstName()}
                    src={faker.image.avatar()}
                    sx={{ width: 150, height: 150 }}
                  />
                  <label htmlFor="file-input">
                    <IconButton
                      color="primary"
                      component="span"
                      aria-label="upload picture"
                      sx={{ position: "absolute", bottom: 0, right: 0 }}
                    >
                      <Camera color="#3f6473" weight="bold" />
                    </IconButton>
                  </label>
                  <Input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    style={{ display: "none" }}
                    // onChange={handleFileChange}
                  />
                </Stack>
                  {/* <Button variant="outlined" type="submit" onSubmit={handleUpload}>Save</Button> */}
              </Stack>
            {/* </form> */}
            <Stack alignItems={"center"} direction={"row"} p={1} spacing={3}>
              {/* <Avatar
                alt={faker.name.firstName()}
                src={faker.image.avatar()}
                sx={{ height: 80, width: 80 }}
              /> */}
              <Stack direction={"column"} spacing={0.5}>
                <Typography variant="article">{name}</Typography>
                <Typography variant="body2">{email}</Typography>
                <Typography variant="body2">{`+91 ${phoneNumber}`}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Profile;
