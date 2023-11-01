import React from "react";
import { UpdateSidebarType } from "../redux/slices/app";
import { useDispatch } from "react-redux";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { CaretLeft } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import { Shared_Docs, Shared_Links } from "../data";
import { DocMsg, LinkMsg } from "./conversation/MsgTypes";

const SharedMessage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack width={"100%"} height={"100%"}>
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.paper,
          }}
        >
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction={"row"}
            alignItems={"center"}
            spacing={2}
          >
            <IconButton
              onClick={() => {
                dispatch(UpdateSidebarType("CONTACT"));
              }}
            >
              <CaretLeft />
            </IconButton>
            <Typography variant="subtitle2">Shared Messages</Typography>
          </Stack>
        </Box>
        {/* body */}
        <Tabs
          sx={{ px: 2.5 , py:1}}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Media" />
          <Tab label="Links" />
          <Tab label="Docs" />
        </Tabs>
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
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
          p={1}
          spacing={2}
        >
          {(() => {
            switch (value) {
              case 0:
                //images
                return (
                  <Grid container spacing={2}>
                    {[0, 1, 2,3,4 ,5].map((el) => {
                      return <Grid item xs={4}>
                        <img
                          src={faker.image.food()}
                          alt={faker.name.firstName()}
                        />
                      </Grid>;
                    })}
                  </Grid>
                );
              case 1:
                return Shared_Links.map((el) => <LinkMsg el={el}/>)
              case 2:
                //Docs
                return Shared_Docs.map((el) => <DocMsg el={el}/>)
              default:
                break;
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  );
};

export default SharedMessage;
