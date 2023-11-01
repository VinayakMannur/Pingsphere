import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import useSettings from "../hooks/useSettings";
import Logo from "../assets/Images/logo.png";
import { Nav_Buttons, Profile_Menu } from "../data/index";
import { Gear } from "phosphor-react";
import MaterialUISwitch from "./MaterialUISwitch";
import { useNavigate } from "react-router-dom";
import useResponsive from "../hooks/useResponsive";

const getPath = (index) => {
  switch (index) {
    case 0:
      return "/app";
    case 1:
      return "/group";
    case 3:
      return "/settings";
    default:
      break;
  }
};

const getMenuPath = (index) => {
  switch (index) {
    case 0:
      return "/profile";
    case 1:
      return "/settings";
    case 2:
      return "/auth/login";
    default:
      break;
  }
};

const SideBar = () => {
  const [selected, setSelected] = useState(0);

  const { onToggleMode } = useSettings();

  const isMobile = useResponsive("between", "md", "xs", "sm");

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  console.log(theme);

  return (
    <Box
      paddingY={2}
      sx={{
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.palette.background.paper
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.5)",
        height: "100vh",
        width: isMobile ? 65: 90,
      }}
    >
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ height: "100%" }}
        spacing={3}
      >
        <Stack alignItems={"center"} spacing={3}>
          <Box
            sx={{
              backgroundColor:
                theme.palette.mode === "light"
                  ? theme.palette.background.paper
                  : theme.palette.background.paper, //theme.palette.primary.main,
              height: 64,
              width: 64,
              borderRadius: 1.5,
            }}
          >
            <img src={Logo} height="54" width="54" alt="logo" />
          </Box>
          <Stack
            sx={{ width: "max-content" }}
            direction={"column"}
            alignItems={"center"}
            spacing={3}
          >
            {Nav_Buttons.map((el, i) =>
              el.index === selected ? (
                <Box
                  key={i}
                  p={0.5}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton
                    sx={{ width: "max-content", color: "#fff" }}
                    key={el.index}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    setSelected(el.index);
                    navigate(getPath(el.index));
                  }}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#000"
                        : theme.palette.text.primary,
                  }}
                  key={el.index}
                >
                  {el.icon}
                </IconButton>
              )
            )}
            <Divider sx={{ width: "48px" }} />
            {selected === 3 ? (
              <Box
                p={0.5}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 1.5,
                }}
              >
                <IconButton
                  sx={{ width: "max-content", color: "#fff" }}
                  key={3}
                >
                  <Gear />
                </IconButton>
              </Box>
            ) : (
              <IconButton
                onClick={() => {
                  setSelected(3);
                  navigate(getPath(3));
                }}
                sx={{
                  width: "max-content",
                  color:
                    theme.palette.mode === "light"
                      ? "#000"
                      : theme.palette.text.primary,
                }}
                key={3}
              >
                <Gear />
              </IconButton>
            )}
          </Stack>
        </Stack>
        <Stack spacing={3} alignItems={"center"}>
          <MaterialUISwitch
            onClick={() => {
              onToggleMode();
            }}
          />
          <Avatar
            src={faker.image.avatar()}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            {Profile_Menu.map((el, idx) => {
              return (
                <MenuItem
                  key={idx}
                  onClick={() => {
                    handleClick();
                  }}
                >
                  <Stack
                    onClick={() => {
                      navigate(getMenuPath(idx));
                    }}
                    sx={{ width: 100 }}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <span>{el.title}</span>
                    {el.icon}
                  </Stack>
                </MenuItem>
              );
            })}
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;
