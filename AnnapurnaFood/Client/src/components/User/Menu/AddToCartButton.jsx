// components/user/Menu/AddToCartButton.jsx
// src/components/user/Menu/AddToCartButton.jsx
import React, { useState, useContext } from "react";
import { /* Button,*/ Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import QuantitySelector from "./QuantitySelector";
import { CartContext } from "../../../context/cartcontext";
import Button from "../../common/Button";

const AddToCartButton = ({
  food, // 👈 make sure to pass this from FoodItemsCard
  onAdd,
  onRemove,
  initialCount = 0,
  sizee = "medium",
  styleType = "primary",
  responsive=true,
}) => {
  // ✅ Access backend functions
  const { addToCart, updateQuantity, removeItem } = useContext(CartContext);

  // ✅ Local state for UI
  const [count, setCount] = useState(initialCount);
  const [isAdded, setIsAdded] = useState(initialCount > 0);

  // ✅ Add first time to cart
  const handleAddToCart = async () => {
    try {
      await addToCart(food._id, 1); // POST /cart/add
      setCount(1);
      setIsAdded(true);
      if (onAdd) onAdd(1);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // ✅ Quantity changed via QuantitySelector
  const handleQuantityChange = async (newQty) => {
    try {
      if (newQty === 0) {
        await removeItem(food._id); // DELETE /cart/removeitem/:id
        setIsAdded(false);
        setCount(0);
        if (onRemove) onRemove(0);
      } else {
        await updateQuantity(food._id, newQty); // PUT /cart/updateqty/:id
        setCount(newQty);
        if (onAdd) onAdd(newQty);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // ✅ Custom button colors
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
    <Box className="d-flex justify-content-center align-items-center">
      {/* When food is NOT added to cart */}
      {!isAdded ? (
        <Button
          text="Add to cart"
          classNamee={responsive ? "btn-responsive" : ""}
          // fullWidth={fullWidth}
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
        ></Button>
      ) : (
        // ✅ When added — show QuantitySelector component
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
