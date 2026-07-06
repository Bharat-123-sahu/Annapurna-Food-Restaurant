// components/Admin/Orders/OrderTable.jsx
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
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Tooltip,
  Box,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  Visibility,
  Delete,
  Edit,
  Search,
  MoreVert,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderTable = () => {
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: "ORD-001",
      customer: "Rohit Sharma",
      restaurant: "Bharat’s Kitchen",
      total: 620,
      payment: "UPI",
      status: "Delivered",
      date: "2025-11-07",
    },
    {
      id: "ORD-002",
      customer: "Priya Singh",
      restaurant: "Tandoor Express",
      total: 430,
      payment: "Cash",
      status: "Pending",
      date: "2025-11-07",
    },
    {
      id: "ORD-003",
      customer: "Amit Patel",
      restaurant: "Urban Spice",
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
    alert(`👀 Viewing details for ${selectedOrder.id}`);
    handleMenuClose();
  };

  const handleEdit = () => {
    alert(`✏️ Updating order ${selectedOrder.id}`);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (window.confirm("❌ Delete this order?")) {
      alert(`✅ Order ${selectedOrder.id} deleted`);
    }
    handleMenuClose();
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.restaurant.toLowerCase().includes(search.toLowerCase())
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container my-5"
    >
      {/* Header */}
      <Box
        className="d-flex justify-content-between align-items-center flex-wrap mb-4"
        sx={{ gap: 2 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#FF6A00" }}>
          📦 All Customer Orders
        </Typography>
        <TextField
          size="small"
          placeholder="Search by name, ID, or restaurant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#FF6A00" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: { xs: "100%", sm: "280px" },
            "& .MuiOutlinedInput-root": { borderRadius: "50px" },
          }}
        />
      </Box>

      {/* Table */}
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
                Restaurant
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
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
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
                    <TableCell>{order.restaurant}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      ₹{order.total}
                    </TableCell>
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
                      <Tooltip title="More Options">
                        <IconButton
                          onClick={(e) => handleMenuOpen(e, order)}
                          sx={{ color: "#FF6A00" }}
                        >
                          <MoreVert />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                  <Typography sx={{ color: "gray" }}>
                    No orders found 😔
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            minWidth: 160,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          },
        }}
      >
        <MenuItem onClick={handleView}>
          <Visibility sx={{ mr: 1, color: "#2196F3" }} /> View Details
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleEdit}>
          <Edit sx={{ mr: 1, color: "#FF9800" }} /> Update Status
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete}>
          <Delete sx={{ mr: 1, color: "#F44336" }} /> Delete Order
        </MenuItem>
      </Menu>
    </motion.div>
  );
};

export default OrderTable;

// import React from "react";
// import Sidebar from "../Layout/Sidebar";
// import TopBar from "../Layout/TopBar";
// import OrderTable from "./OrderTable";
// import { Box } from "@mui/material";

// const AdminOrdersPage = () => {
//   return (
//     <Box sx={{ display: "flex" }}>
//       <Sidebar />
//       <Box sx={{ flexGrow: 1 }}>
//         <TopBar />
//         <Box sx={{ mt: 10, p: 3 }}>
//           <OrderTable />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AdminOrdersPage;

// useEffect(() => {
//   axios.get("/api/admin/orders").then((res) => setOrders(res.data));
// }, []);
