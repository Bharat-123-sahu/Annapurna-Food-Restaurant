// components/restaurant/Management/ViewOrder.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Button,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelIcon from "@mui/icons-material/Cancel";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewOrder = ({ orderData, onBack, onStatusChange }) => {
  const [order, setOrder] = useState(
    orderData || {
      id: "ORD-001",
      customer: {
        name: "Rohit Sharma",
        email: "rohit@example.com",
        phone: "9876543210",
        address: "Sector 10, Indore, MP",
      },
      date: "2025-11-07",
      payment: "UPI",
      status: "Pending",
      total: 620,
      items: [
        {
          id: 1,
          name: "Paneer Butter Masala",
          price: 220,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1601050690597-31c4b43e4d07?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 2,
          name: "Butter Naan",
          price: 50,
          quantity: 2,
          image:
            "https://images.unsplash.com/photo-1626082927389-6c0d03503a05?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 3,
          name: "Masala Chai",
          price: 100,
          quantity: 3,
          image:
            "https://images.unsplash.com/photo-1634912962395-7e087b62a1b8?auto=format&fit=crop&w=800&q=80",
        },
      ],
    }
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return { color: "#4CAF50", bg: "rgba(76,175,80,0.1)" };
      case "Pending":
        return { color: "#FF9800", bg: "rgba(255,152,0,0.1)" };
      case "Cancelled":
        return { color: "#F44336", bg: "rgba(244,67,54,0.1)" };
      default:
        return { color: "#9E9E9E", bg: "rgba(158,158,158,0.1)" };
    }
  };

  const handleStatusChange = (newStatus) => {
    const updatedOrder = { ...order, status: newStatus };
    setOrder(updatedOrder);
    if (onStatusChange) onStatusChange(updatedOrder);
    alert(`✅ Order marked as ${newStatus}`);
  };

  const { color, bg } = getStatusColor(order.status);

  return (
    <div className="container my-5">
      <Card
        className="shadow-lg border-0"
        sx={{
          borderRadius: "20px",
          overflow: "hidden",
          p: 3,
        }}
      >
        {/* Header */}
        <Box
          className="d-flex justify-content-between align-items-center flex-wrap"
          sx={{ mb: 3 }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#FF6A00" }}>
            📦 Order Details
          </Typography>

          {onBack && (
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={onBack}
              sx={{
                color: "#FF6A00",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { color: "#EE0979" },
              }}
            >
              Back to Orders
            </Button>
          )}
        </Box>

        {/* Order Info */}
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            <b>Order ID:</b> {order.id}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            <b>Date:</b> {order.date}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            <b>Payment Method:</b> {order.payment}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            <b>Status:</b>{" "}
            <Chip
              label={order.status}
              sx={{
                backgroundColor: bg,
                color: color,
                fontWeight: 600,
              }}
            />
          </Typography>
        </Box>

        {/* Customer Info */}
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          👤 Customer Details
        </Typography>
        <Typography variant="body1">
          <b>Name:</b> {order.customer.name}
        </Typography>
        <Typography variant="body1">
          <b>Email:</b> {order.customer.email}
        </Typography>
        <Typography variant="body1">
          <b>Phone:</b> {order.customer.phone}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          <b>Address:</b> {order.customer.address}
        </Typography>

        {/* Items Table */}
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          🍴 Ordered Items
        </Typography>

        <Table>
          <TableHead sx={{ backgroundColor: "#FF6A00" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Item</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Price (₹)</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Qty</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Total (₹)</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Avatar
                    variant="rounded"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "10px",
                    }}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{item.name}</TableCell>
                <TableCell>₹{item.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  ₹{item.price * item.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Total Summary */}
        <Divider sx={{ my: 3 }} />
        <Box
          className="d-flex justify-content-end align-items-center"
          sx={{ flexWrap: "wrap", gap: 2 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Total Amount: ₹{order.total}
          </Typography>
        </Box>

        {/* Status Buttons */}
        <Box
          className="d-flex justify-content-end mt-4"
          sx={{ gap: 2, flexWrap: "wrap" }}
        >
          {order.status !== "Delivered" && (
            <Button
              variant="contained"
              startIcon={<LocalShippingIcon />}
              sx={{
                backgroundColor: "#4CAF50",
                color: "#fff",
                borderRadius: "50px",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#388E3C" },
              }}
              onClick={() => handleStatusChange("Delivered")}
            >
              Mark as Delivered
            </Button>
          )}

          {order.status !== "Cancelled" && (
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              sx={{
                borderColor: "#F44336",
                color: "#F44336",
                borderRadius: "50px",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "rgba(244,67,54,0.1)",
                },
              }}
              onClick={() => handleStatusChange("Cancelled")}
            >
              Cancel Order
            </Button>
          )}
        </Box>
      </Card>
    </div>
  );
};

export default ViewOrder;

// import React, { useState } from "react";
// import ViewOrder from "./ViewOrder";
// import OrderTable from "./OrderTable";

// const OrderManagement = () => {
//   const [viewMode, setViewMode] = useState(false);

//   const handleStatusChange = (updatedOrder) => {
//     console.log("Order Updated:", updatedOrder);
//   };

//   return (
//     <>
//       {viewMode ? (
//         <ViewOrder
//           onBack={() => setViewMode(false)}
//           onStatusChange={handleStatusChange}
//         />
//       ) : (
//         <OrderTable />
//       )}
//     </>
//   );
// };

// export default OrderManagement;

// Fetch order details
// useEffect(() => {
//   axios.get(`/api/restaurant/orders/${orderId}`).then(res => setOrder(res.data));
// }, []);

// // Update status
// axios.put(`/api/restaurant/orders/${order._id}`, { status: "Delivered" });
