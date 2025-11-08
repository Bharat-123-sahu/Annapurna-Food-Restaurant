
// components/user/Cart/CartItemCard.jsx
import React from "react";
import { Card, CardContent, Typography, IconButton, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import QuantitySelector from "../Menu/QuantitySelector";
import "bootstrap/dist/css/bootstrap.min.css";

const CartItemCard = ({ item, onQuantityChange, onRemove }) => {
  const handleQuantityChange = (value) => {
    if (onQuantityChange) onQuantityChange(item.id, value);
  };

  return (
    <Card
      className="shadow-sm border-0 mb-3"
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      <div className="row g-0 align-items-center">
        {/* Image */}
        <div className="col-4 col-md-3">
          <img
            src={item.image}
            alt={item.name}
            className="w-100 h-100"
            style={{
              objectFit: "cover",
              height: "130px",
              borderRadius: "16px 0 0 16px",
            }}
          />
        </div>

        {/* Content */}
        <div className="col-8 col-md-9">
          <CardContent>
            <div className="d-flex justify-content-between align-items-start">
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {item.name}
              </Typography>

              {/* Delete Button */}
              <IconButton
                onClick={() => onRemove(item.id)}
                sx={{
                  color: "#EE0979",
                  "&:hover": { backgroundColor: "rgba(238,9,121,0.1)" },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>

            <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
              {item.cuisine || "Delicious meal"}
            </Typography>

            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="d-flex align-items-center gap-2">
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#FF6A00" }}>
                  ₹{item.price}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  × {item.quantity}
                </Typography>
              </div>

              {/* Quantity Selector */}
              <QuantitySelector
                quantity={item.quantity}
                min={1}
                max={10}
                onChange={handleQuantityChange}
              />
            </div>

            <Divider sx={{ my: 1 }} />

            {/* Subtotal */}
            <div className="d-flex justify-content-between align-items-center">
              <Typography variant="body2" sx={{ color: "gray" }}>
                Subtotal:
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#333" }}>
                ₹{(item.price * item.quantity).toFixed(2)}
              </Typography>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default CartItemCard;

// import React, { useState } from "react";
// import CartItemCard from "./CartItemCard";
// import { Typography, Divider, Button } from "@mui/material";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       name: "Margherita Pizza",
//       price: 249,
//       quantity: 2,
//       image:
//         "https://images.unsplash.com/photo-1601924582975-7e1d99c0a3c4?auto=format&fit=crop&w=800&q=80",
//     },
//     {
//       id: 2,
//       name: "Chicken Burger",
//       price: 199,
//       quantity: 1,
//       image:
//         "https://images.unsplash.com/photo-1606755962773-0c8f1d1074bc?auto=format&fit=crop&w=800&q=80",
//     },
//   ]);

//   const handleQuantityChange = (id, value) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, quantity: value } : item
//       )
//     );
//   };

//   const handleRemove = (id) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="container my-5">
//       <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
//         Your Cart 🛒
//       </Typography>

//       {cartItems.length === 0 ? (
//         <Typography variant="body1" sx={{ color: "gray" }}>
//           Your cart is empty 😔
//         </Typography>
//       ) : (
//         <>
//           {cartItems.map((item) => (
//             <CartItemCard
//               key={item.id}
//               item={item}
//               onQuantityChange={handleQuantityChange}
//               onRemove={handleRemove}
//             />
//           ))}

//           <Divider sx={{ my: 3 }} />

//           <div className="d-flex justify-content-between align-items-center">
//             <Typography variant="h6" sx={{ fontWeight: 600 }}>
//               Total:
//             </Typography>
//             <Typography variant="h6" sx={{ fontWeight: 700, color: "#FF6A00" }}>
//               ₹{total.toFixed(2)}
//             </Typography>
//           </div>

//           <div className="text-end mt-4">
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "#FF6A00",
//                 px: 4,
//                 py: 1.2,
//                 fontWeight: 600,
//                 borderRadius: "50px",
//                 "&:hover": { backgroundColor: "#EE0979" },
//               }}
//             >
//               Proceed to Checkout
//             </Button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;
