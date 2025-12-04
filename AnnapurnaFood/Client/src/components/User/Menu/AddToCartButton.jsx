// components/user/Menu/AddToCartButton.jsx
// src/components/user/Menu/AddToCartButton.jsx
import React, { useState, useContext, useEffect } from "react";
import { Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import QuantitySelector from "./QuantitySelector";
import { CartContext } from "../../../context/cartcontext";
import Button from "../../common/Button";

const AddToCartButton = ({
  food,
  onAdd,
  onRemove,
  initialCount = 0,
  sizee = "medium",
  styleType = "primary",
  responsive = true,
}) => {
  const { cart, addToCart, updateQuantity, removeItem } =
    useContext(CartContext);

  const [count, setCount] = useState(initialCount);
  const [isAdded, setIsAdded] = useState(initialCount > 0);

  // ⭐ Find cart item ID using food._id
  // const getCartItemId = () => {
  //   const item = cart.find((c) => c.food._id === food._id);
  //   return item?._id; // return cart item ID
  // };
const getCartItemId = () => {
  const item = cart.find((c) => c.food._id === food._id);
  return item?._id;
};

useEffect(() => {
  const cartItem = cart.find((c) => c.food._id === food._id);

  if (cartItem) {
    setIsAdded(true);
    setCount(cartItem.quantity);
  } else {
    setIsAdded(false);
    setCount(0);
  }
}, [cart]);

// ⭐ Add first time
const handleAddToCart = () => {
  addToCart(food._id, 1); // ✔ correct
  onAdd?.(1);
};

// ⭐ When quantity changes
const handleQuantityChange = (newQty) => {
  const cartItemId = getCartItemId();
  if (!cartItemId) return;

  if (newQty === 0) {
    removeItem(cartItemId);
  } else {
    updateQuantity(cartItemId, newQty);
  }
};


  // Styling
  const colors =
    styleType === "primary"
      ? { bg: "#FF6A00", hover: "#EE0979", text: "#fff" }
      : { bg: "#fff", hover: "#f8f8f8", text: "#FF6A00" };

  return (
    <Box className="d-flex justify-content-center align-items-center">
      {!isAdded ? (
        <Button
          text="Add to cart"
          classNamee={responsive ? "btn-responsive" : ""}
          onClickk={handleAddToCart}
          sizee={sizee}
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
            "&:hover": { backgroundColor: colors.hover },
          }}
        />
      ) : (
        <QuantitySelector
          quantity={count}
          min={0}
          max={10}
          onChange={handleQuantityChange}
          color="#FF6A00"
          size="medium"
        />
      )}
    </Box>
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
