// components/Utils/EmptyState.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Reusable Empty State Component
 * @param {string} title - The main title (e.g. "No Orders Found")
 * @param {string} subtitle - Additional text or hint
 * @param {string} buttonLabel - Optional action button text
 * @param {function} onAction - Callback for button click
 * @param {JSX.Element} icon - Optional custom icon
 */

const EmptyState = ({
  title = "No Data Found",
  subtitle = "There’s nothing to show right now.",
  buttonLabel = "",
  onAction,
  icon = <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: "#FF6A00" }} />,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        className="text-center my-5"
        sx={{
          p: 4,
          borderRadius: "16px",
          backgroundColor: "rgba(255,106,0,0.03)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          maxWidth: 500,
          margin: "auto",
        }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          {icon}
        </motion.div>

        <Typography variant="h6" sx={{ fontWeight: 700, mt: 2, color: "#333" }}>
          {title}
        </Typography>

        <Typography variant="body2" sx={{ color: "gray", mb: 3, mt: 1 }}>
          {subtitle}
        </Typography>

        {buttonLabel && (
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="contained"
              onClick={onAction}
              sx={{
                background: "linear-gradient(90deg, #FF6A00, #EE0979)",
                borderRadius: "50px",
                fontWeight: 600,
                textTransform: "none",
                px: 4,
                py: 1,
                "&:hover": {
                  background: "linear-gradient(90deg, #EE0979, #FF6A00)",
                },
              }}
            >
              {buttonLabel}
            </Button>
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
};

export default EmptyState;

// Example 1 — Empty Orders Page
// import React from "react";
// import EmptyState from "../Utils/EmptyState";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// const OrdersPage = () => {
//   return (
//     <div className="container">
//       <EmptyState
//         title="No Orders Yet"
//         subtitle="You haven’t placed any orders yet. Start ordering delicious meals now!"
//         buttonLabel="Order Now"
//         onAction={() => alert("🛒 Redirecting to menu...")}
//         icon={<ShoppingCartIcon sx={{ fontSize: 70, color: "#EE0979" }} />}
//       />
//     </div>
//   );
// };

// export default OrdersPage;

// Example 2 — Empty Users List (Admin)
// import React from "react";
// import EmptyState from "../Utils/EmptyState";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

// const UsersEmpty = () => (
//   <EmptyState
//     title="No Users Found"
//     subtitle="Try adjusting your filters or search again."
//     buttonLabel="Refresh"
//     onAction={() => window.location.reload()}
//     icon={<PeopleAltIcon sx={{ fontSize: 70, color: "#FF6A00" }} />}
//   />
// );

// export default UsersEmpty;

// 🧁 Example 3 — Empty Restaurant Menu
// import React from "react";
// import EmptyState from "../Utils/EmptyState";
// import RestaurantIcon from "@mui/icons-material/Restaurant";

// const MenuEmpty = () => (
//   <EmptyState
//     title="No Food Items"
//     subtitle="Add some delicious dishes to your restaurant’s menu."
//     buttonLabel="Add Food"
//     onAction={() => alert("🍴 Redirecting to Add Food Form...")}
//     icon={<RestaurantIcon sx={{ fontSize: 65, color: "#FF6A00" }} />}
//   />
// );

// export default MenuEmpty;
