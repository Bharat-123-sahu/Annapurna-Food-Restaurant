// components/Admin/Layout/Sidebar.jsx
// components/Admin/Layout/Sidebar.jsx
import React, { useState } from "react";
import { Box, Typography, Avatar, IconButton, Tooltip } from "@mui/material";
import {
  Dashboard,
  RestaurantMenu,
  Category,
  BarChart,
  PeopleAlt,
  Settings,
  Logout,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const menuItems = [
  { name: "Dashboard", icon: <Dashboard />, path: "/admin/dashboard" },
  { name: "Foods", icon: <RestaurantMenu />, path: "/admin/foods" },
  { name: "Categories", icon: <Category />, path: "/admin/categories" },
  { name: "Analytics", icon: <BarChart />, path: "/admin/analytics" },
  { name: "Users", icon: <PeopleAlt />, path: "/admin/users" },
  { name: "Settings", icon: <Settings />, path: "/admin/settings" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <motion.div
      animate={{ width: isOpen ? 250 : 80 }}
      transition={{ duration: 0.3, type: "spring", damping: 20 }}
      className="d-flex flex-column shadow-sm position-fixed top-0 start-0 vh-100"
      style={{
        background: "linear-gradient(180deg, #FF6A00, #EE0979)",
        color: "#fff",
        zIndex: 1200,
        borderRight: "2px solid rgba(255,255,255,0.2)",
        overflowX: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isOpen ? "space-between" : "center",
          px: 2,
          py: 2,
        }}
      >
        {isOpen && (
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Admin Panel
          </Typography>
        )}
        <IconButton
          onClick={toggleSidebar}
          sx={{
            color: "#fff",
            "&:hover": { transform: "rotate(180deg)" },
            transition: "transform 0.3s ease",
          }}
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>

      <hr style={{ borderColor: "rgba(255,255,255,0.2)", margin: 0 }} />

      {/* Profile */}
      <Box
        className="text-center my-3"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar
          src="https://cdn-icons-png.flaticon.com/512/706/706830.png"
          sx={{
            width: isOpen ? 70 : 45,
            height: isOpen ? 70 : 45,
            border: "2px solid #fff",
            transition: "all 0.3s ease",
          }}
        />
        {isOpen && (
          <>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Admin User
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.8)" }}
            >
              Super Admin
            </Typography>
          </>
        )}
      </Box>

      {/* Menu */}
      <Box className="flex-grow-1 px-2">
        {menuItems.map((item, i) => (
          <NavLink
            to={item.path}
            key={i}
            className={({ isActive }) =>
              `d-flex align-items-center mb-2 p-2 text-decoration-none rounded-3 ${
                isActive ? "active-menu" : ""
              }`
            }
            style={({ isActive }) => ({
              color: isActive ? "#fff" : "rgba(255,255,255,0.85)",
              background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
              transition: "all 0.3s ease",
            })}
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item.icon}
            </motion.div>
            {isOpen && (
              <Typography variant="subtitle2" sx={{ ml: 2, fontWeight: 600 }}>
                {item.name}
              </Typography>
            )}
          </NavLink>
        ))}
      </Box>

      {/* Logout */}
      <Box className="mt-auto mb-3 px-3">
        <Tooltip title="Logout">
          <Box
            className="d-flex align-items-center p-2 rounded-3"
            sx={{
              cursor: "pointer",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
            }}
            onClick={() => alert("🔒 Logged out successfully!")}
          >
            <Logout />
            {isOpen && (
              <Typography variant="subtitle2" sx={{ ml: 2, fontWeight: 600 }}>
                Logout
              </Typography>
            )}
          </Box>
        </Tooltip>
      </Box>

      {/* Active Menu CSS */}
      <style>{`
        .active-menu {
          background-color: rgba(255,255,255,0.15) !important;
          border-left: 4px solid #fff;
        }
      `}</style>
    </motion.div>
  );
};

export default Sidebar;

// import React from "react";
// import Sidebar from "../Layout/Sidebar";
// import DashboardHeader from "../../DashboardCommon/DashboardHeader";
// import { Box } from "@mui/material";

// const AdminLayout = () => {
//   return (
//     <Box sx={{ display: "flex" }}>
//       <Sidebar />
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           ml: { xs: 10, sm: 25 },
//           mt: 8,
//           p: 3,
//           transition: "margin-left 0.3s ease",
//         }}
//       >
//         <DashboardHeader restaurantName="Admin Control Panel" />
//         <h2>Welcome, Admin 👑</h2>
//         <p>Manage everything efficiently with your new Ultimate Sidebar.</p>
//       </Box>
//     </Box>
//   );
// };

// export default AdminLayout;
