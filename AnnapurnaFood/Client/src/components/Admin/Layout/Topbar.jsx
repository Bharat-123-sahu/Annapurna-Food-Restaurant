// components/Admin/Layout/TopBar.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  Switch,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Brightness4,
  Brightness7,
  Search,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const TopBar = ({ onToggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications] = useState(3); // Example badge count

  const handleProfileMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <AppBar
        position="fixed"
        elevation={3}
        sx={{
          background: darkMode
            ? "linear-gradient(90deg, #232526, #414345)"
            : "linear-gradient(90deg, #FF6A00, #EE0979)",
          color: "#fff",
          zIndex: 1100,
        }}
      >
        <Toolbar className="d-flex justify-content-between align-items-center flex-wrap px-3">
          {/* Left Section - Menu Toggle & Title */}
          <Box className="d-flex align-items-center gap-3">
            <IconButton
              onClick={onToggleSidebar}
              sx={{ color: "#fff" }}
              className="d-lg-none"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, letterSpacing: "0.5px" }}
            >
              Admin Dashboard
            </Typography>
          </Box>

          {/* Middle Section - Search Bar */}
          <Box
            className="d-flex align-items-center"
            sx={{
              backgroundColor: "rgba(255,255,255,0.15)",
              px: 2,
              py: 0.5,
              borderRadius: "30px",
              width: { xs: "100%", sm: "250px", md: "350px" },
              transition: "all 0.3s ease",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
            }}
          >
            <Search sx={{ color: "white", mr: 1 }} />
            <InputBase
              placeholder="Search here..."
              sx={{
                color: "#fff",
                width: "100%",
                fontSize: "0.9rem",
              }}
            />
          </Box>

          {/* Right Section - Icons & Profile */}
          <Box className="d-flex align-items-center gap-3">
            {/* Dark / Light Mode */}
            <Tooltip
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <IconButton onClick={toggleTheme} sx={{ color: "#fff" }}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>

            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton sx={{ color: "#fff" }}>
                <Badge badgeContent={notifications} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Profile Avatar */}
            <Tooltip title="Profile Menu">
              <IconButton onClick={handleProfileMenu}>
                <Avatar
                  src="https://cdn-icons-png.flaticon.com/512/706/706830.png"
                  sx={{
                    width: 40,
                    height: 40,
                    border: "2px solid rgba(255,255,255,0.5)",
                  }}
                />
              </IconButton>
            </Tooltip>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  borderRadius: "12px",
                  minWidth: 180,
                  mt: 1.5,
                  backgroundColor: darkMode ? "#2C2C2C" : "#fff",
                  color: darkMode ? "#fff" : "#333",
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
                },
              }}
            >
              <MenuItem onClick={handleClose}>👤 View Profile</MenuItem>
              <MenuItem onClick={handleClose}>⚙️ Settings</MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  alert("🔒 Logged out successfully!");
                }}
              >
                🚪 Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default TopBar;

// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import TopBar from "./TopBar";
// import { Box, Typography } from "@mui/material";

// const AdminLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);

//   return (
//     <Box sx={{ display: "flex" }}>
//       <Sidebar isOpen={sidebarOpen} />
//       <Box sx={{ flexGrow: 1 }}>
//         <TopBar onToggleSidebar={handleSidebarToggle} />
//         <Box sx={{ mt: 10, p: 3 }}>
//           <Typography variant="h5" sx={{ fontWeight: 600 }}>
//             Welcome back, Admin 👋
//           </Typography>
//           <Typography sx={{ color: "gray" }}>
//             Manage analytics, users, and restaurants efficiently.
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AdminLayout;
