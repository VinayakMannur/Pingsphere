import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
// import { Stack } from "@mui/material";

const LoadingScreen = () => {
  return (
    // <Stack alignItems={"center"} justifyContent={"center"} >

    // </Stack>
    <Box
      sx={{ display: "flex",flexDirection: 'row', alignItems: 'center', justifyContent:"center" }}
      alignItems="center"
      // mt={"40%"}
    >
    <CircularProgress />
    </Box>
  );
};

export default LoadingScreen;
