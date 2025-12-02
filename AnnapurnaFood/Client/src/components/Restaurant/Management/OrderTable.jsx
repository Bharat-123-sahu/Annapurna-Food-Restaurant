// components/restaurant/Management/OrderTable.jsx
import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Chip,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "bootstrap/dist/css/bootstrap.min.css";

export const OrderTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const open = Boolean(anchorEl);

  const orders = [
    {
      id: "ORD-001",
      customer: "Rohit Sharma",
      total: 620,
      payment: "UPI",
      status: "Delivered",
      date: "2025-11-07",
    },
    {
      id: "ORD-002",
      customer: "Priya Singh",
      total: 430,
      payment: "Cash",
      status: "Pending",
      date: "2025-11-07",
    },
    {
      id: "ORD-003",
      customer: "Amit Patel",
      total: 890,
      payment: "Card",
      status: "Cancelled",
      date: "2025-11-06",
    },
  ];

  const handleMenuOpen = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleView = () => {
    alert(`👀 Viewing details for order ${selectedOrder.id}`);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this order? ❌")) {
      alert(`Order ${selectedOrder.id} deleted`);
    }
    handleMenuClose();
  };

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

  return (
    <div className="container my-5">
      <Box
        className="d-flex justify-content-between align-items-center mb-4"
        sx={{ flexWrap: "wrap", gap: 2 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#FF6A00" }}>
          📦 Orders Management
        </Typography>
        <Typography variant="body2" sx={{ color: "gray" }}>
          Manage customer orders and track delivery status.
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        className="shadow-sm border-0"
        sx={{ borderRadius: "16px" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#FF6A00" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                Order ID
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                Customer
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                Total (₹)
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                Payment
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                Date
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontWeight: 600, textAlign: "center" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => {
              const { color, bg } = getStatusColor(order.status);
              return (
                <TableRow
                  key={order.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255,106,0,0.05)",
                      transition: "0.3s",
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 600 }}>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>₹{order.total}</TableCell>
                  <TableCell>{order.payment}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      sx={{
                        backgroundColor: bg,
                        color: color,
                        fontWeight: 600,
                        borderRadius: "8px",
                      }}
                    />
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, order)}
                      sx={{ color: "#FF6A00" }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            minWidth: 180,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          },
        }}
      >
        <MenuItem onClick={handleView}>
          <VisibilityIcon sx={{ mr: 1, color: "#4CAF50" }} /> View Details
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete}>
          <DeleteIcon sx={{ mr: 1, color: "#EE0979" }} /> Delete Order
        </MenuItem>
      </Menu>
    </div>
  );
};

// import React from "react";
// import Sidebar from "../DashboardCommon/Sidebar";
// import DashboardHeader from "../DashboardCommon/DashboardHeader";
// import OrderTable from "./OrderTable";
// import { Box } from "@mui/material";

// const OrdersPage = () => {
//   return (
//     <Box sx={{ display: "flex" }}>
//       <Sidebar />
//       <Box component="main" sx={{ flexGrow: 1, mt: 10, p: 3 }}>
//         <DashboardHeader restaurantName="Bharat’s Kitchen" />
//         <OrderTable />
//       </Box>
//     </Box>
//   );
// };

// export default OrdersPage;

// import { useEffect, useState } from "react";
// import axios from "axios";

// useEffect(() => {
//   axios.get("/api/restaurant/orders").then((res) => setOrders(res.data));
// }, []);
