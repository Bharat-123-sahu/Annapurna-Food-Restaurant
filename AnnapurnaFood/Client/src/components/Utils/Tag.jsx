// components/Utils/Tag.jsx
import React from "react";
import { Chip, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import {
  CheckCircle,
  LocalFireDepartment,
  NewReleases,
  HourglassEmpty,
  LocalOffer,
  ThumbUp,
  Cancel,
  Restaurant,
} from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Reusable Tag Component
 * @param {string} label - Text to display inside the tag
 * @param {string} type - Type of tag (success, danger, warning, info, spicy, new, etc.)
 * @param {boolean} pulse - Enable pulse animation
 * @param {boolean} icon - Show icon or not
 */

const Tag = ({ label = "Tag", type = "info", pulse = false, icon = true }) => {
  const getTagProps = (type) => {
    switch (type) {
      case "success":
        return {
          color: "#4CAF50",
          bg: "rgba(76,175,80,0.1)",
          Icon: CheckCircle,
        };
      case "danger":
      case "error":
        return {
          color: "#F44336",
          bg: "rgba(244,67,54,0.1)",
          Icon: Cancel,
        };
      case "warning":
      case "pending":
        return {
          color: "#FF9800",
          bg: "rgba(255,152,0,0.1)",
          Icon: HourglassEmpty,
        };
      case "spicy":
        return {
          color: "#E53935",
          bg: "rgba(229,57,53,0.1)",
          Icon: LocalFireDepartment,
        };
      case "new":
        return {
          color: "#EE0979",
          bg: "rgba(238,9,121,0.1)",
          Icon: NewReleases,
        };
      case "offer":
        return {
          color: "#FF6A00",
          bg: "rgba(255,106,0,0.1)",
          Icon: LocalOffer,
        };
      case "featured":
        return {
          color: "#2196F3",
          bg: "rgba(33,150,243,0.1)",
          Icon: ThumbUp,
        };
      case "restaurant":
        return {
          color: "#9C27B0",
          bg: "rgba(156,39,176,0.1)",
          Icon: Restaurant,
        };
      default:
        return {
          color: "#607D8B",
          bg: "rgba(96,125,139,0.1)",
          Icon: CheckCircle,
        };
    }
  };

  const { color, bg, Icon } = getTagProps(type);

  return (
    <Tooltip title={label}>
      <motion.div
        animate={pulse ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        style={{ display: "inline-block" }}
      >
        <Chip
          icon={icon ? <Icon sx={{ color }} /> : null}
          label={label}
          sx={{
            backgroundColor: bg,
            color,
            fontWeight: 600,
            fontSize: "0.8rem",
            textTransform: "capitalize",
            borderRadius: "8px",
            px: 0.5,
            boxShadow: `0 0 6px ${color}22`,
            "& .MuiChip-icon": {
              marginLeft: "4px",
              color,
            },
          }}
        />
      </motion.div>
    </Tooltip>
  );
};

export default Tag;

// 🍕 Example 1 — Food Item Tags
// import React from "react";
// import Tag from "../Utils/Tag";
// import { Box } from "@mui/material";

// const FoodTags = () => (
//   <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", p: 2 }}>
//     <Tag label="Veg" type="success" />
//     <Tag label="Spicy" type="spicy" pulse />
//     <Tag label="New" type="new" />
//     <Tag label="20% Off" type="offer" pulse />
//   </Box>
// );

// export default FoodTags;

// 🧾 Example 2 — Order Status Tags
// import React from "react";
// import Tag from "../Utils/Tag";
// import { Box } from "@mui/material";

// const OrderStatus = () => (
//   <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
//     <Tag label="Pending" type="warning" pulse />
//     <Tag label="Delivered" type="success" />
//     <Tag label="Cancelled" type="danger" />
//   </Box>
// );

// export default OrderStatus;

// 🏪 Example 3 — Restaurant Status
// import React from "react";
// import Tag from "../Utils/Tag";

// const RestaurantTag = () => (
//   <Tag label="Featured Restaurant" type="restaurant" pulse />
// );

// export default RestaurantTag;

{
  /* <Tag
  label={order.status}
  type={
    order.status === "Delivered"
      ? "success"
      : order.status === "Pending"
      ? "warning"
      : "danger"
  }
  pulse={order.status === "Pending"}
/> */
}
