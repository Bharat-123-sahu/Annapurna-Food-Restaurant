// components/Utils/Breadcrumb.jsx
import React from "react";
import { Breadcrumbs, Typography, Link, Box } from "@mui/material";
import { motion } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

/**
 * Reusable Breadcrumb Component
 * @param {Array} links - Array of breadcrumb items [{ label, path }]
 * @param {string} current - The current page name
 */

const Breadcrumb = ({ links = [], current = "Dashboard" }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255,106,0,0.05)",
          borderRadius: "12px",
          p: 1.5,
          display: "flex",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
        className="mb-3"
      >
        <Breadcrumbs
          separator={
            <NavigateNextIcon fontSize="small" sx={{ color: "#FF6A00" }} />
          }
          aria-label="breadcrumb"
          sx={{
            "& .MuiBreadcrumbs-separator": { mx: 0.5 },
            fontWeight: 500,
          }}
        >
          {/* Home Link */}
          <Link
            underline="hover"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#FF6A00",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={() => navigate("/admin/dashboard")}
          >
            <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
            Home
          </Link>

          {/* Dynamic Links */}
          {links.map((link, index) => (
            <Link
              key={index}
              underline="hover"
              color="#EE0979"
              sx={{
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => link.path && navigate(link.path)}
            >
              {link.label}
            </Link>
          ))}

          {/* Current Page */}
          <Typography
            color="text.primary"
            sx={{
              fontWeight: 700,
              color: "#333",
            }}
          >
            {current}
          </Typography>
        </Breadcrumbs>
      </Box>
    </motion.div>
  );
};

export default Breadcrumb;

// import React from "react";
// import Breadcrumb from "../Utils/Breadcrumb";
// import { Box, Typography } from "@mui/material";

// const RestaurantManagement = () => {
//   return (
//     <Box sx={{ p: 3 }}>
//       <Breadcrumb
//         links={[
//           { label: "Admin", path: "/admin/dashboard" },
//           { label: "Restaurants", path: "/admin/restaurants" },
//         ]}
//         current="Restaurant List"
//       />

//       <Typography variant="h5" sx={{ fontWeight: 700 }}>
//         🏪 Restaurant List
//       </Typography>
//       <Typography sx={{ color: "gray", mb: 2 }}>
//         View, approve, or manage restaurants easily.
//       </Typography>
//     </Box>
//   );
// };

// export default RestaurantManagement;

// For User Dashboard:

// <Breadcrumb
//   links={[{ label: "Profile", path: "/user/profile" }]}
//   current="Edit Profile"
// />
// For Admin Orders Page:

// <Breadcrumb
//   links={[
//     { label: "Admin", path: "/admin/dashboard" },
//     { label: "Orders", path: "/admin/orders" },
//   ]}
//   current="Order Details"
// />
