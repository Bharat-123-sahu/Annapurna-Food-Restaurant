// components/user/Menu/QuantitySelector.jsx
import React from "react";
import { IconButton, Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const QuantitySelector = ({
  quantity = 1,
  min = 1,
  max = 10,
  onChange,
  color = "#FF6A00",
  size = "medium",
}) => {
  const handleIncrease = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const sizes = {
    small: { fontSize: "0.8rem", padding: "3px 6px" },
    medium: { fontSize: "1rem", padding: "4px 8px" },
    large: { fontSize: "1.1rem", padding: "6px 10px" },
  };

  return (
    <Box
      className="d-flex align-items-center justify-content-center gap-2"
      sx={{
        backgroundColor: "#fff",
        border: `2px solid ${color}`,
        borderRadius: "50px",
        px: 1,
        py: 0.5,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Decrease Button */}
      <IconButton
        size="small"
        onClick={handleDecrease}
        sx={{
          color,
          "&:hover": { backgroundColor: "rgba(255,106,0,0.1)" },
          ...sizes[size],
        }}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>

      {/* Quantity Display */}
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          color,
          minWidth: "20px",
          textAlign: "center",
          userSelect: "none",
          ...sizes[size],
        }}
      >
        {quantity}
      </Typography>

      {/* Increase Button */}
      <IconButton
        size="small"
        onClick={handleIncrease}
        sx={{
          color,
          "&:hover": { backgroundColor: "rgba(255,106,0,0.1)" },
          ...sizes[size],
        }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;

// import React, { useState } from "react";
// import { Card, CardContent, Typography } from "@mui/material";
// import QuantitySelector from "./QuantitySelector";

// const FoodItem = ({ food }) => {
//   const [quantity, setQuantity] = useState(1);

//   const handleQuantityChange = (value) => {
//     setQuantity(value);
//     console.log(`${food.name} quantity:`, value);
//   };

//   return (
//     <Card
//       sx={{
//         borderRadius: "16px",
//         overflow: "hidden",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//         "&:hover": { transform: "translateY(-4px)" },
//         transition: "0.3s",
//       }}
//     >
//       <img
//         src={food.image}
//         alt={food.name}
//         style={{ height: "160px", objectFit: "cover", width: "100%" }}
//       />
//       <CardContent>
//         <Typography variant="h6" sx={{ fontWeight: 600 }}>
//           {food.name}
//         </Typography>
//         <Typography variant="subtitle1" sx={{ color: "#FF6A00", mb: 2 }}>
//           ₹{food.price}
//         </Typography>

//         <QuantitySelector
//           quantity={quantity}
//           onChange={handleQuantityChange}
//           min={1}
//           max={10}
//         />
//       </CardContent>
//     </Card>
//   );
// };

// export default FoodItem;
