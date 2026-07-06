// components/user/Orders/SuccessManager.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CelebrationIcon from "@mui/icons-material/Celebration";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import "bootstrap/dist/css/bootstrap.min.css";

const SuccessManager = ({
  orderId = "ORD-20251107",
  total = 648.0,
  paymentMethod = "UPI",
  onTrackOrder,
  onViewOrders,
  onGoHome,
}) => {
  return (
    <div className="container my-5 d-flex justify-content-center align-items-center">
      <Card
        className="shadow-lg border-0"
        sx={{
          maxWidth: "600px",
          width: "100%",
          borderRadius: "20px",
          textAlign: "center",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.85))",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          p: 2,
        }}
      >
        <CardContent>
          {/* Success Icon */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <CheckCircleIcon
              sx={{
                fontSize: "5rem",
                color: "#4CAF50",
                animation: "pop 0.6s ease-in-out",
              }}
            />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#4CAF50",
              mb: 1,
            }}
          >
            Order Successful!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#555",
              mb: 3,
            }}
          >
            🎉 Thank you for your order! We’re preparing your delicious food.
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* Order Details */}
          <Box className="text-start mx-auto" sx={{ maxWidth: "400px" }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              <b>Order ID:</b> {orderId}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              <b>Payment Method:</b> {paymentMethod}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              <b>Total Amount:</b> ₹{total.toFixed(2)}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 3 }}>
              <b>Status:</b>{" "}
              <span style={{ color: "#4CAF50", fontWeight: 600 }}>
                Confirmed
              </span>
            </Typography>
          </Box>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              startIcon={<CelebrationIcon />}
              sx={{
                backgroundColor: "#FF6A00",
                borderRadius: "50px",
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                "&:hover": { backgroundColor: "#EE0979" },
              }}
              onClick={onTrackOrder || (() => alert("Tracking coming soon 🚚"))}
            >
              Track Order
            </Button>

            <Button
              variant="outlined"
              startIcon={<ListAltIcon />}
              sx={{
                borderRadius: "50px",
                borderColor: "#FF6A00",
                color: "#FF6A00",
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                "&:hover": { backgroundColor: "rgba(255,106,0,0.1)" },
              }}
              onClick={onViewOrders || (() => alert("View Orders clicked!"))}
            >
              View My Orders
            </Button>

            <Button
              variant="text"
              startIcon={<HomeIcon />}
              sx={{
                borderRadius: "50px",
                color: "#555",
                textTransform: "none",
                fontWeight: 600,
              }}
              onClick={onGoHome || (() => alert("Going to Home 🏠"))}
            >
              Go to Home
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Keyframes Animation */}
      <style>
        {`
          @keyframes pop {
            0% { transform: scale(0.5); opacity: 0; }
            60% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default SuccessManager;

// import React from "react";
// import Navbar from "../../Navbar";
// import Footer from "../../Footer";
// import SuccessManager from "./SuccessManager";

// const OrderSuccessPage = () => {
//   const handleTrackOrder = () => {
//     alert("Tracking your order... 🚚");
//   };

//   const handleViewOrders = () => {
//     window.location.href = "/user/orders";
//   };

//   const handleGoHome = () => {
//     window.location.href = "/";
//   };

//   return (
//     <>
//       <Navbar />
//       <SuccessManager
//         orderId="ORD-20251107"
//         total={649}
//         paymentMethod="PhonePe UPI"
//         onTrackOrder={handleTrackOrder}
//         onViewOrders={handleViewOrders}
//         onGoHome={handleGoHome}
//       />
//       <Footer />
//     </>
//   );
// };

// export default OrderSuccessPage;
