// components/Utils/RatingStars.jsx
import React, { useState } from "react";
import { Box, IconButton, Typography, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Reusable RatingStars Component
 * @param {number} value - Initial rating value (1–5)
 * @param {boolean} readOnly - Whether stars are interactive
 * @param {function} onChange - Callback when rating changes
 * @param {boolean} showValue - Whether to display numeric rating
 */

const RatingStars = ({
  value = 0,
  readOnly = false,
  onChange,
  showValue = true,
  size = 32,
}) => {
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(value);

  const handleClick = (index) => {
    if (readOnly) return;
    setRating(index);
    if (onChange) onChange(index);
  };

  const getColor = (index) => {
    const filled = hover ? index <= hover : index <= rating;
    return filled ? "#FF6A00" : "#ccc";
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.5,
      }}
    >
      {[1, 2, 3, 4, 5].map((index) => (
        <Tooltip
          key={index}
          title={
            !readOnly
              ? [
                  "Terrible 😖",
                  "Poor 😕",
                  "Okay 🙂",
                  "Good 😋",
                  "Excellent 🤩",
                ][index - 1]
              : ""
          }
        >
          <motion.div
            whileHover={{ scale: readOnly ? 1 : 1.15 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <IconButton
              onClick={() => handleClick(index)}
              onMouseEnter={() => !readOnly && setHover(index)}
              onMouseLeave={() => setHover(null)}
              sx={{
                p: 0.3,
                color: getColor(index),
                transition: "color 0.3s ease",
              }}
            >
              {index <= (hover || rating) ? (
                <StarIcon
                  sx={{
                    fontSize: size,
                    color:
                      index <= (hover || rating)
                        ? `url(#grad${index})`
                        : "#ccc",
                    background: "linear-gradient(90deg, #FF6A00, #EE0979)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor:
                      index <= (hover || rating) ? "transparent" : "#ccc",
                  }}
                />
              ) : (
                <StarBorderIcon sx={{ fontSize: size, color: "#ccc" }} />
              )}
            </IconButton>
          </motion.div>
        </Tooltip>
      ))}

      {showValue && (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            ml: 1,
            color: "#FF6A00",
          }}
        >
          {rating.toFixed(1)}
        </Typography>
      )}
    </Box>
  );
};

export default RatingStars;

// 🧁 1. Interactive Rating for Food Item
// import React from "react";
// import RatingStars from "../Utils/RatingStars";
// import { Box, Typography } from "@mui/material";

// const FoodRating = () => {
//   const handleRatingChange = (value) => {
//     console.log("⭐ New Rating:", value);
//   };

//   return (
//     <Box sx={{ textAlign: "center", p: 4 }}>
//       <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
//         Rate this Dish 🍕
//       </Typography>
//       <RatingStars value={4} onChange={handleRatingChange} />
//     </Box>
//   );
// };

// export default FoodRating;

// 2. Read-Only Rating Display (for Restaurant Cards)
// import React from "react";
// import RatingStars from "../Utils/RatingStars";
// import { Box, Typography } from "@mui/material";

// const RestaurantCard = () => (
//   <Box sx={{ textAlign: "center", p: 2 }}>
//     <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//       The Royal Feast
//     </Typography>
//     <RatingStars value={4.5} readOnly showValue />
//   </Box>
// );

// export default RestaurantCard;
// const handleRatingChange = async (value) => {
//   await axios.post("/api/foods/rate", { foodId: 123, rating: value });
//   alert(`✅ Thanks for rating ${value} stars!`);
// };
