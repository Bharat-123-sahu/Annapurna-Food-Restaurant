// components/Utils/Badge.jsx
import React from "react";
import { Chip, Tooltip, Box } from "@mui/material";
import {
  CheckCircle,
  HourglassEmpty,
  Block,
  Notifications,
  Info,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Reusable Badge Component
 * @param {string} type - "success" | "pending" | "error" | "info" | "notification"
 * @param {string | number} label - The text or count displayed on the badge
 * @param {boolean} pulse - Whether the badge should have a pulse animation
 * @param {boolean} icon - Whether to display an icon along with text
 */

const Badge = ({
  type = "info",
  label = "Info",
  pulse = false,
  icon = true,
}) => {
  const getBadgeProps = (type) => {
    switch (type) {
      case "success":
        return {
          color: "#4CAF50",
          bg: "rgba(76,175,80,0.15)",
          Icon: CheckCircle,
        };
      case "pending":
        return {
          color: "#FF9800",
          bg: "rgba(255,152,0,0.15)",
          Icon: HourglassEmpty,
        };
      case "error":
        return {
          color: "#F44336",
          bg: "rgba(244,67,54,0.15)",
          Icon: Block,
        };
      case "notification":
        return {
          color: "#EE0979",
          bg: "rgba(238,9,121,0.15)",
          Icon: Notifications,
        };
      default:
        return {
          color: "#2196F3",
          bg: "rgba(33,150,243,0.15)",
          Icon: Info,
        };
    }
  };

  const { color, bg, Icon } = getBadgeProps(type);

  return (
    <Tooltip title={typeof label === "string" ? label : ""}>
      <motion.div
        animate={pulse ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        style={{ display: "inline-block" }}
      >
        <Chip
          icon={icon ? <Icon sx={{ color: color }} /> : null}
          label={label}
          sx={{
            backgroundColor: bg,
            color,
            fontWeight: 600,
            borderRadius: "10px",
            textTransform: "capitalize",
            boxShadow: `0 0 6px ${color}33`,
            "& .MuiChip-icon": { marginLeft: "4px" },
          }}
        />
      </motion.div>
    </Tooltip>
  );
};

export default Badge;

// import React from "react";
// import Badge from "../Utils/Badge";
// import { Box, Typography } from "@mui/material";

// const BadgeDemo = () => {
//   return (
//     <Box
//       className="container text-center my-5"
//       sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}
//     >
//       <Typography variant="h6" sx={{ width: "100%", fontWeight: 700, mb: 2 }}>
//         🔖 Dynamic Badges
//       </Typography>

//       <Badge type="success" label="Approved" pulse />
//       <Badge type="pending" label="Pending" />
//       <Badge type="error" label="Blocked" pulse />
//       <Badge type="notification" label={4} />
//       <Badge type="info" label="New Update" />
//     </Box>
//   );
// };

// export default BadgeDemo;

// In User Table
// <Badge type={user.status === "Active" ? "success" : "error"} label={user.status} />

// In Restaurant Table
// <Badge type={r.status === "Approved" ? "success" : r.status === "Rejected" ? "error" : "pending"} label={r.status} />

// As Notification Counter
// <Badge type="notification" label={5} pulse />
