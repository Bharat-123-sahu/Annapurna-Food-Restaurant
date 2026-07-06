// components/user/OrderHistory.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Divider,
  Box,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderHistory = () => {
  // Sample order data — replace with API data later
  const orders = [
    {
      id: "ORD-20251101",
      date: "Nov 1, 2025",
      items: [
        { name: "Paneer Tikka", qty: 1 },
        { name: "Butter Naan", qty: 2 },
      ],
      total: 420,
      status: "Delivered",
    },
    {
      id: "ORD-20251028",
      date: "Oct 28, 2025",
      items: [{ name: "Chicken Biryani", qty: 2 }],
      total: 580,
      status: "Pending",
    },
    {
      id: "ORD-20251020",
      date: "Oct 20, 2025",
      items: [{ name: "Veg Fried Rice", qty: 1 }],
      total: 210,
      status: "Canceled",
    },
  ];

  const getStatusChip = (status) => {
    switch (status) {
      case "Delivered":
        return (
          <Chip
            icon={<CheckCircleIcon />}
            label="Delivered"
            sx={{
              backgroundColor: "rgba(0, 200, 83, 0.1)",
              color: "#00C853",
              fontWeight: 600,
            }}
          />
        );
      case "Pending":
        return (
          <Chip
            icon={<AccessTimeIcon />}
            label="Pending"
            sx={{
              backgroundColor: "rgba(255, 193, 7, 0.1)",
              color: "#FFC107",
              fontWeight: 600,
            }}
          />
        );
      case "Canceled":
        return (
          <Chip
            icon={<CancelIcon />}
            label="Canceled"
            sx={{
              backgroundColor: "rgba(244, 67, 54, 0.1)",
              color: "#F44336",
              fontWeight: 600,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container my-5">
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 4, color: "#333", textAlign: "center" }}
      >
        My Orders 🧾
      </Typography>

      {orders.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ textAlign: "center", color: "gray", mt: 5 }}
        >
          You haven’t placed any orders yet 😔
        </Typography>
      ) : (
        <div className="row g-4">
          {orders.map((order) => (
            <div key={order.id} className="col-12 col-md-6 col-lg-4">
              <Card
                className="shadow-sm border-0"
                sx={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardContent>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 700, color: "#FF6A00" }}
                    >
                      {order.id}
                    </Typography>
                    {getStatusChip(order.status)}
                  </div>

                  <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
                    Placed on: <b>{order.date}</b>
                  </Typography>

                  <Divider sx={{ mb: 1 }} />

                  {/* Items */}
                  <Box sx={{ mb: 1 }}>
                    {order.items.map((item, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                        sx={{ color: "#333" }}
                      >
                        {item.name} × {item.qty}
                      </Typography>
                    ))}
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  {/* Total */}
                  <div className="d-flex justify-content-between align-items-center">
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, color: "#333" }}
                    >
                      Total:
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: "#FF6A00" }}
                    >
                      ₹{order.total}
                    </Typography>
                  </div>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      backgroundColor: "#FF6A00",
                      color: "#fff",
                      fontWeight: 600,
                      borderRadius: "50px",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#EE0979" },
                    }}
                    onClick={() => alert(`Viewing details for ${order.id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
