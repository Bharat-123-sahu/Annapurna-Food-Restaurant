// components/user/Menu/AddToCartButton.jsx
import React, { useState } from "react";
import { Button, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const AddToCartButton = ({
  onAdd,
  onRemove,
  initialCount = 0,
  size = "medium",
  styleType = "primary",
}) => {
  const [count, setCount] = useState(initialCount);

  const handleAdd = () => {
    const newCount = count + 1;
    setCount(newCount);
    if (onAdd) onAdd(newCount);
  };

  const handleRemove = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      if (onRemove) onRemove(newCount);
    }
  };

  // Custom colors
  const colors =
    styleType === "primary"
      ? {
          bg: "#FF6A00",
          hover: "#EE0979",
          text: "#fff",
        }
      : {
          bg: "#fff",
          hover: "#f8f8f8",
          text: "#FF6A00",
        };

  return (
    <div className="d-flex justify-content-center align-items-center gap-2">
      {/* When no item is added */}
      {count === 0 ? (
        <Button
          onClick={handleAdd}
          size={size}
          startIcon={<ShoppingCartIcon />}
          sx={{
            backgroundColor: colors.bg,
            color: colors.text,
            borderRadius: "50px",
            px: 3,
            py: 1,
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            "&:hover": {
              backgroundColor: colors.hover,
            },
          }}
        >
          Add to Cart
        </Button>
      ) : (
        // When item is added
        <div
          className="d-flex align-items-center justify-content-center px-3 py-1 rounded-pill"
          style={{
            backgroundColor: "#fff",
            border: "2px solid #FF6A00",
            color: "#FF6A00",
            fontWeight: 600,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <IconButton size="small" onClick={handleRemove} sx={{ color: "#FF6A00" }}>
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography variant="body1" sx={{ mx: 1, fontWeight: 600 }}>
            {count}
          </Typography>
          <IconButton size="small" onClick={handleAdd} sx={{ color: "#FF6A00" }}>
            <AddIcon fontSize="small" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;

// import React from "react";
// import AddToCartButton from "../Menu/AddToCartButton";
// import { Card, CardContent, Typography } from "@mui/material";

// const FoodItemCard = ({ item }) => {
//   const handleAdd = (count) => {
//     console.log(`${item.name} added, count:`, count);
//   };

//   const handleRemove = (count) => {
//     console.log(`${item.name} removed, count:`, count);
//   };

//   return (
//     <Card
//       sx={{
//         borderRadius: "16px",
//         overflow: "hidden",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//         transition: "transform 0.3s ease",
//         "&:hover": { transform: "translateY(-6px)" },
//       }}
//     >
//       <img
//         src={item.image}
//         alt={item.name}
//         className="w-100"
//         style={{ height: "160px", objectFit: "cover" }}
//       />
//       <CardContent>
//         <Typography variant="h6" sx={{ fontWeight: 600 }}>
//           {item.name}
//         </Typography>
//         <Typography variant="subtitle1" sx={{ color: "#FF6A00", mb: 1 }}>
//           ₹{item.price}
//         </Typography>
//         <AddToCartButton onAdd={handleAdd} onRemove={handleRemove} />
//       </CardContent>
//     </Card>
//   );
// };

// export default FoodItemCard;
