// components/restaurant/DashboardCommon/Sidebar.jsx
// components/restaurant/DashboardCommon/Sidebar.jsx
// components/restaurant/DashboardCommon/Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Box,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import DashboardIcon from "@mui/icons-material/Dashboard";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import StorefrontIcon from "@mui/icons-material/Storefront";

import { DashboardHeader } from "./DashboardHeader";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("Dashboard");

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const sidebarWidth = "20vw";

  // Menu Data
  const menuItems = [
    { name: "Dashboard", icon: <DashboardIcon />, to: "/dashboard" },
    { name: "Orders", icon: <ShoppingCartIcon />, to: "/dashboard/orders" },
    { name: "Items", icon: <FastfoodIcon />, to: "/dashboard/items" },
    { name: "Add food", icon: <PeopleIcon />, to: "/dashboard/add-food" },
    { name: "Edit food", icon: <PeopleIcon />, to: "/dashboard/edit-food" },
    { name: "Profile", icon: <StorefrontIcon />, to: "/dashboard/profile" },
    { name: "Settings", icon: <SettingsIcon />, to: "/dashboard/rest-setting" },
  ];

  const handellogout = async (e) => {
    e.preventDefault();
    console.log("button automatic call");
    const ok = window.confirm("Are you sure you want to logout?");
    if (!ok) return;

    try {
      const res = await axios.post(
        "http://localhost:2000/rastaurant/logout",
        {},

        { withCredentials: true }
      );
      console.log(res.data);
      alert("Logout successful");
      navigate("/reastaurant-login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return (
    <Box className="d-flex min-vh-100 w-100">
      {/* ✔ Header always visible */}
      <DashboardHeader
        widthh={{ md: `calc(100% - ${sidebarWidth})`, xs: "100%" }}
        leftOffset={{ md: sidebarWidth, xs: 0 }}
        onMenuToggle={() => setOpen((o) => !o)}
      />

      {/* ❌ Removed Wrong Main Content — This belongs to Layout.jsx */}

      {/* ✔ Drawer Sidebar */}
      <Drawer
        anchor="left"
        variant={isMdUp ? "permanent" : "temporary"}
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "80vw", sm: "55vw", md: sidebarWidth },
            background: "linear-gradient(180deg, #FF6A00, #EE0979)",
            color: "#fff",
            border: "none",
            padding: "0.75rem",
          },
        }}
      >
        {!isMdUp && <Toolbar />}

        {/* Logo */}
        <Box className="text-center mb-3 d-flex flex-column align-items-center justify-content-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
            alt="logo"
            width="60"
            className="mb-2"
          />
          <Typography variant="h6" className="fw-bold">
            Annapurna foodies heaven
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.3)", mb: 2 }} />

        {/* Menu Items */}
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.name} disablePadding className="mb-2">
              {/* ✔ Entire button is now clickable */}
              <Link
                to={item.to}
                style={{ width: "100%", textDecoration: "none" }}
                onClick={() => setActive(item.name)}
              >
                <ListItemButton
                  className="rounded-3"
                  sx={{
                    backgroundColor:
                      active === item.name
                        ? "rgba(255,255,255,0.2)"
                        : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.15)",
                      transform: "translateX(5px)",
                      transition: "0.2s",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "#fff" }}>
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText primary={item.name} sx={{ color: "#fff" }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.3)", mt: 2 }} />

        {/* Logout */}
        <List>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                backgroundColor: "rgba(255,255,255,0.15)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
              }}
              onClick={handellogout}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;

// import React from "react";
// import Sidebar from "./Sidebar";

// const RestaurantDashboard = () => {
//   const handlePageChange = (page) => {
//     console.log("Navigating to:", page);
//   };

//   return (
//     <div>
//       <Sidebar onNavigate={handlePageChange} />
//     </div>
//   );
// };

// export default RestaurantDashboard;
