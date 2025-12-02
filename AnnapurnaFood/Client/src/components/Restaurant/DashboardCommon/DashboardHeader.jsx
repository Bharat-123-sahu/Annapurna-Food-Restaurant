// components/restaurant/DashboardCommon/DashboardHeader.jsx
// components/restaurant/DashboardCommon/DashboardHeader.jsx
import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  InputBase,
  Badge,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";

import { RestaurantContext } from "../../../context/restaurantdata";


export const DashboardHeader = ({
  restaurantName = "Foodie Restaurant",
  onMenuToggle,
  widthh = "100%",
  leftOffset = 0, // string/object ok
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
// const {restaurants,fetchRestaurantById} =useContext(RestaurantContext)
  // const { fetchRestaurantById, restaurants } = useContext(RestaurantContext)
  // useEffect(() => {
  //   if (state?.id) {
  //     return fetchRestaurantById(state.id);
  //   }
  // });

  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    alert("Logged out successfully 🍔");
    handleClose();
  };

  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        background: "linear-gradient(90deg, #FF6A00, #EE0979)",
        color: "#fff",
        zIndex: (theme) => theme.zIndex.modal + 1, // header > drawer backdrop
        width: widthh,
        ml: leftOffset, // offset when sidebar is on LEFT (md+)
      }}
      className="shadow-sm" // bootstrap subtle shadow
    >
      {/* container-fluid for responsive paddings */}
      <Toolbar className="container-fluid px-3 px-md-4">
        {/* Left: menu + title */}
        <Box className="d-flex align-items-center gap-2" sx={{ flexShrink: 0 }}>
          {/* Mobile hamburger */}
          <IconButton
            edge="start"
            color="inherit"
            onClick={onMenuToggle}
            className="d-md-none" // bootstrap visibility
            sx={{
              backgroundColor: "rgba(255,255,255,0.1)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            className="fw-bold"
            sx={{ letterSpacing: "0.5px" }}
          >
            {restaurantName}
          </Typography>
        </Box>

        {/* Center: search (use bootstrap pill look) */}
        <Box
          className="d-flex align-items-center mx-md-4 my-2 my-md-0 flex-grow-1"
          sx={{ justifyContent: "center" }}
        >
          <Box
            className="d-flex align-items-center rounded-pill px-3 py-1 w-100"
            style={{
              maxWidth: 620,
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
          >
            <SearchIcon className="me-2" />
            <InputBase
              placeholder="Search orders, menu items..."
              className="w-100"
              sx={{
                color: "#fff",
                "& input::placeholder": { color: "#f2f2f2", opacity: 0.9 },
              }}
            />
          </Box>
        </Box>

        {/* Right: icons + avatar */}
        <Box className="d-flex align-items-center gap-2" sx={{ flexShrink: 0 }}>
          <IconButton color="inherit" className="text-white">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit" className="text-white">
            <Badge badgeContent={2} color="error">
              <MailIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={handleProfileClick}>
            <Avatar
              alt=""
              src={``|| "R"}
              className="border border-2"
              sx={{
                width: 38,
                height: 38,
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              className: "rounded-4 shadow", // bootstrap classes
              sx: { mt: 1.5, minWidth: 180 },
            }}
          >
            <MenuItem onClick={handleClose} className="py-2">
              <PersonIcon className="me-2" style={{ color: "#FF6A00" }} />{" "}
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose} className="py-2">
              <SettingsIcon className="me-2" style={{ color: "#FF6A00" }} />{" "}
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout} className="py-2">
              <LogoutIcon className="me-2" style={{ color: "#EE0979" }} />{" "}
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// import React, { useState } from "react";
// import DashboardHeader from "./DashboardHeader";
// import Sidebar from "./Sidebar";
// import { Box } from "@mui/material";

// const RestaurantDashboardLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <Box sx={{ display: "flex" }}>
//       <DashboardHeader
//         restaurantName="Bharat’s Kitchen"
//         onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
//       />
//       <Sidebar />
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           mt: 10,
//           p: 3,
//           backgroundColor: "#fafafa",
//           minHeight: "100vh",
//         }}
//       >
//         {/* Example Content */}
//         <h2>Welcome to your Dashboard 🍴</h2>
//         <p>Manage your orders, menu, and settings from here.</p>
//       </Box>
//     </Box>
//   );
// };

// export default RestaurantDashboardLayout;
