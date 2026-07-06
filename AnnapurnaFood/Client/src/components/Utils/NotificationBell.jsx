// components/Utils/NotificationBell.jsx
import React, { useState } from "react";
import {
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Tooltip,
  Button,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CircleIcon from "@mui/icons-material/Circle";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Reusable Notification Bell component
 * @param {Array} notifications - List of notifications [{ id, title, message, time, read }]
 * @param {function} onView - Callback when notification clicked
 */

const NotificationBell = ({ notifications = [], onView }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [items, setItems] = useState(notifications);
  const open = Boolean(anchorEl);

  const unreadCount = items.filter((n) => !n.read).length;

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleViewNotification = (id) => {
    const updated = items.map((n) => (n.id === id ? { ...n, read: true } : n));
    setItems(updated);
    if (onView) onView(id);
  };

  const handleMarkAllRead = () => {
    const updated = items.map((n) => ({ ...n, read: true }));
    setItems(updated);
  };

  return (
    <Box>
      {/* Bell Icon */}
      <Tooltip title="Notifications">
        <motion.div
          whileHover={{ scale: 1.1 }}
          animate={unreadCount > 0 ? { rotate: [0, -10, 10, -5, 5, 0] } : {}}
          transition={{
            duration: 0.5,
            repeat: unreadCount > 0 ? 2 : 0,
          }}
        >
          <IconButton
            onClick={handleClick}
            sx={{ color: "#FF6A00", position: "relative" }}
          >
            <Badge
              badgeContent={unreadCount}
              color="error"
              overlap="circular"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: unreadCount ? "#EE0979" : "transparent",
                },
              }}
            >
              {unreadCount > 0 ? (
                <NotificationsActiveIcon fontSize="large" />
              ) : (
                <NotificationsNoneIcon fontSize="large" />
              )}
            </Badge>
          </IconButton>
        </motion.div>
      </Tooltip>

      {/* Notifications Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 330,
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(90deg, #FF6A00, #EE0979)",
            color: "#fff",
            p: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>
          {unreadCount > 0 && (
            <Button
              size="small"
              onClick={handleMarkAllRead}
              sx={{
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.75rem",
                "&:hover": { color: "#FFEFEF" },
              }}
            >
              Mark all as read
            </Button>
          )}
        </Box>

        {items.length === 0 ? (
          <Box
            sx={{
              p: 3,
              textAlign: "center",
              color: "gray",
            }}
          >
            <Typography>No new notifications 🎉</Typography>
          </Box>
        ) : (
          items.map((n) => (
            <MenuItem
              key={n.id}
              onClick={() => handleViewNotification(n.id)}
              sx={{
                alignItems: "flex-start",
                py: 1.5,
                px: 2,
                backgroundColor: n.read ? "#fff" : "rgba(255,106,0,0.05)",
                "&:hover": {
                  backgroundColor: "rgba(255,106,0,0.1)",
                },
              }}
            >
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "start" }}>
                {!n.read && (
                  <CircleIcon sx={{ color: "#EE0979", fontSize: 10, mt: 1 }} />
                )}
                <Box>
                  <Typography
                    sx={{
                      fontWeight: n.read ? 500 : 700,
                      fontSize: "0.9rem",
                      color: "#333",
                    }}
                  >
                    {n.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      color: "gray",
                    }}
                  >
                    {n.message}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      color: "#999",
                      mt: 0.3,
                    }}
                  >
                    {n.time}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
          ))
        )}

        <Divider />
        <Box
          sx={{
            textAlign: "center",
            py: 1.5,
            color: "#FF6A00",
            fontWeight: 600,
            cursor: "pointer",
            "&:hover": { color: "#EE0979" },
          }}
          onClick={() => alert("🔔 View all notifications")}
        >
          View All
        </Box>
      </Menu>
    </Box>
  );
};

export default NotificationBell;

// import React from "react";
// import NotificationBell from "../Utils/NotificationBell";
// import { Box, Typography } from "@mui/material";

// const notifications = [
//   {
//     id: 1,
//     title: "New Order Received",
//     message: "Order #AF2025 has been placed successfully.",
//     time: "2 mins ago",
//     read: false,
//   },
//   {
//     id: 2,
//     title: "Restaurant Approved",
//     message: "Your restaurant listing has been verified.",
//     time: "1 hour ago",
//     read: true,
//   },
//   {
//     id: 3,
//     title: "New User Registered",
//     message: "John Doe just joined the platform.",
//     time: "3 hours ago",
//     read: false,
//   },
// ];

// const AdminHeader = () => {
//   const handleView = (id) => {
//     console.log("👁 Viewing notification ID:", id);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "flex-end",
//         p: 2,
//       }}
//     >
//       <Typography sx={{ fontWeight: 600, mr: 2 }}>Welcome, Admin</Typography>
//       <NotificationBell notifications={notifications} onView={handleView} />
//     </Box>
//   );
// };

// export default AdminHeader;

// {
//   id: 1,
//   title: "New Order",
//   message: "You have a new order!",
//   time: "2 mins ago",
//   read: false
// }
