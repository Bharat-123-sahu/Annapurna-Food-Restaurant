// components/restaurant/DashboardCommon/Sidebar.jsx
// components/restaurant/DashboardCommon/Sidebar.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StatsCards";

const Sidebar = ({ onNavigate }) => {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("Dashboard");

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // Single source of truth
  const sidebarWidth = "20vw"; // e.g. "280px" if you prefer fixed

  const handleNavigate = (page) => {
    setActive(page);
    onNavigate?.(page);
  };

  const menuItems = [
    { name: "Dashboard", icon: <DashboardIcon /> },
    { name: "Orders", icon: <ShoppingCartIcon /> },
    { name: "Menu Items", icon: <FastfoodIcon /> },
    { name: "Customers", icon: <PeopleIcon /> },
    { name: "Profile", icon: <StorefrontIcon /> },
    { name: "Settings", icon: <SettingsIcon /> },
  ];

  return (
    <Box className="d-flex min-vh-100 w-100">
      {/* Header: remaining width on md+, full on mobile; left drawer offset */}
      <DashboardHeader
        widthh={{ md: `calc(100% - ${sidebarWidth})`, xs: "100%" }}
        leftOffset={{ md: sidebarWidth, xs: 0 }}
        onMenuToggle={() => setOpen((o) => !o)}
      />

      {/* MAIN — remaining space (shift RIGHT by left drawer width on md+) */}
      <Box
        component="main"
        className="container-fluid"
        sx={{
          flexGrow: 1,
          ml: { md: sidebarWidth, xs: 0 },
          transition: "margin 0.3s ease",
        }}
      >
        {/* keep content below fixed AppBar */}
        <Toolbar />

        <div className="pt-2 pt-md-3">
          <Typography variant="h5" className="fw-bold mb-3" sx={{ color: "#FF6A00" }}>
            {active} Page
          </Typography>

          {/* Example content */}
          <StatsCards />
        </div>
      </Box>

      {/* LEFT Drawer — permanent on md+, temporary on mobile */}
      <Drawer
        anchor="left"
        variant={isMdUp ? "permanent" : "temporary"}
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        // Keep backdrop under AppBar so header stays clickable on mobile
        slotProps={{
          backdrop: {
            sx: (t) => ({ zIndex: t.zIndex.appBar - 1 }),
          },
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "80vw", md: sidebarWidth }, // responsive width
            boxSizing: "border-box",
            background: "linear-gradient(180deg, #FF6A00, #EE0979)",
            color: "#fff",
            border: "none",
            padding: "0.75rem", // bootstrap-like spacing
          },
        }}
      >
        {/* Spacer below AppBar on mobile temporary drawer */}
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
            FoodieAdmin
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.3)", mb: 2 }} />

        {/* Menu Items */}
        <List className="pb-2">
          {menuItems.map((item) => (
            <ListItem key={item.name} disablePadding className="mb-2">
              <ListItemButton
                onClick={() => handleNavigate(item.name)}
                className="rounded-3"
                sx={{
                  backgroundColor:
                    active === item.name ? "rgba(255,255,255,0.2)" : "transparent",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.15)",
                    transform: "translateX(5px)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{ className: "fw-semibold" }}
                  sx={{ color: "#fff" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.3)", mt: 1 }} />

        {/* Logout */}
        <List className="mt-2">
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => alert("Logging out...")}
              className="rounded-3"
              sx={{
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "#fff",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
              }}
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
