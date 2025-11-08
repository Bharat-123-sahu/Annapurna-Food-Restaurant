// components/user/Cart/OrderSummary.jsx
import React from "react";
import { Card, CardContent, Typography, Divider, Button } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderSummary = ({ subtotal = 0, taxRate = 0.05, deliveryCharge = 30, onPlaceOrder }) => {
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount + deliveryCharge;

  return (
    <Card
      className="shadow-sm border-0 mt-4"
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 3,
            textAlign: "center",
            color: "#FF6A00",
          }}
        >
          Order Summary 🧾
        </Typography>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <Typography variant="body1">Subtotal:</Typography>
          <Typography variant="body1">₹{subtotal.toFixed(2)}</Typography>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <Typography variant="body1">Tax (5%):</Typography>
          <Typography variant="body1">₹{taxAmount.toFixed(2)}</Typography>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <Typography variant="body1">Delivery Charge:</Typography>
          <Typography variant="body1">₹{deliveryCharge.toFixed(2)}</Typography>
        </div>

        <Divider sx={{ my: 2 }} />

        <div className="d-flex justify-content-between align-items-center">
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#333",
            }}
          >
            Total:
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#FF6A00",
            }}
          >
            ₹{total.toFixed(2)}
          </Typography>
        </div>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            backgroundColor: "#FF6A00",
            color: "#fff",
            borderRadius: "50px",
            py: 1.2,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "#EE0979",
            },
          }}
          onClick={onPlaceOrder}
        >
          Place Order
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;

// import React, { useState } from "react";
// import CartItemCard from "./CartItemCard";
// import OrderSummary from "./OrderSummary";
// import { Typography, Divider } from "@mui/material";

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       name: "Paneer Tikka",
//       price: 249,
//       quantity: 2,
//       image:
//         "https://images.unsplash.com/photo-1605478577068-71bdbdff28c2?auto=format&fit=crop&w=800&q=80",
//     },
//     {
//       id: 2,
//       name: "Chicken Biryani",
//       price: 299,
//       quantity: 1,
//       image:
//         "https://images.unsplash.com/photo-1632203171959-ecedc858b4b2?auto=format&fit=crop&w=800&q=80",
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

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const handlePlaceOrder = () => {
//     alert("Your order has been placed successfully! 🎉");
//   };

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
//         <div className="row">
//           <div className="col-12 col-md-8">
//             {cartItems.map((item) => (
//               <CartItemCard
//                 key={item.id}
//                 item={item}
//                 onQuantityChange={handleQuantityChange}
//                 onRemove={handleRemove}
//               />
//             ))}
//           </div>

//           <div className="col-12 col-md-4">
//             <OrderSummary subtotal={subtotal} onPlaceOrder={handlePlaceOrder} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;

