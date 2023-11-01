import React from "react";
import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";

const Conversation = () => {
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* header */}
      <Header />

      {/* conversation */}
      <Box
        sx={{
          flexGrow: 1,
          height: "100%",
          overflowY: "scroll",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
        width={"100%"}
      >
        <Message menu={true}/>
      </Box>
      
      {/* footer  */}
      <Footer />
    </Stack>
  );
};

export default Conversation;
