// components/Admin/Restaurants/RestaurantTable.jsx
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
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import {
  Search,
  MoreVert,
  Visibility,
  CheckCircle,
  Block,
  Delete,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import ApprovalModal from "./ApprovalModal";

const RestaurantTable = () => {
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);

  // Sample restaurant data
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: "The Royal Feast",
      ownerName: "Ankit Sharma",
      email: "royalfeast@gmail.com",
      phone: "+91 9898989898",
      address: "Vijay Nagar, Indore",
      image:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
      status: "Pending",
    },
    {
      id: 2,
      name: "Tandoor Treats",
      ownerName: "Neha Verma",
      email: "tandoortreats@gmail.com",
      phone: "+91 9123456789",
      address: "Palasia, Indore",
      image:
        "https://images.unsplash.com/photo-1576618148400-f54bed99fc1d?auto=format&fit=crop&w=800&q=80",
      status: "Approved",
    },
    {
      id: 3,
      name: "Wok Street",
      ownerName: "Rahul Jain",
      email: "wokstreet@gmail.com",
      phone: "+91 9988776655",
      address: "New Palasia, Indore",
      image:
        "https://images.unsplash.com/photo-1628191010661-4dc2eaf1b4c0?auto=format&fit=crop&w=800&q=80",
      status: "Rejected",
    },
  ]);

  // Menu handlers
  const handleMenuOpen = (event, restaurant) => {
    setAnchorEl(event.currentTarget);
    setSelectedRestaurant(restaurant);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRestaurant(null);
  };

  // Modal handlers
  const handleView = () => {
    setApprovalModalOpen(true);
    handleMenuClose();
  };

  const handleApprove = (restaurant) => {
    alert(`✅ Approved ${restaurant.name}`);
    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === restaurant.id ? { ...r, status: "Approved" } : r
      )
    );
  };

  const handleReject = (restaurant) => {
    alert(`❌ Rejected ${restaurant.name}`);
    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === restaurant.id ? { ...r, status: "Rejected" } : r
      )
    );
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      setRestaurants(restaurants.filter((r) => r.id !== selectedRestaurant.id));
      alert("🗑️ Deleted successfully!");
    }
    handleMenuClose();
  };

  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusChip = (status) => {
    switch (status) {
      case "Approved":
        return (
          <Chip
            label="Approved"
            sx={{
              backgroundColor: "rgba(76,175,80,0.1)",
              color: "#4CAF50",
              fontWeight: 600,
            }}
          />
        );
      case "Rejected":
        return (
          <Chip
            label="Rejected"
            sx={{
              backgroundColor: "rgba(244,67,54,0.1)",
              color: "#F44336",
              fontWeight: 600,
            }}
          />
        );
      default:
        return (
          <Chip
            label="Pending"
            sx={{
              backgroundColor: "rgba(255,152,0,0.1)",
              color: "#FF9800",
              fontWeight: 600,
            }}
          />
        );
    }
  };

  return (
    <motion.div
      className="container my-5"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <Box
        className="d-flex justify-content-between align-items-center flex-wrap mb-4"
        sx={{ gap: 2 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#FF6A00" }}>
          🏪 Restaurant Management
        </Typography>
        <TextField
          size="small"
          placeholder="Search restaurants..."
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
                Image
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                Restaurant
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                Owner
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                Status
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontWeight: 600, textAlign: "center" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((r) => (
                <TableRow
                  key={r.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255,106,0,0.05)",
                      transition: "0.3s",
                    },
                  }}
                >
                  <TableCell>
                    <Avatar
                      src={r.image}
                      alt={r.name}
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "12px",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{r.name}</TableCell>
                  <TableCell>{r.ownerName}</TableCell>
                  <TableCell>{r.email}</TableCell>
                  <TableCell>{getStatusChip(r.status)}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="More">
                      <IconButton
                        onClick={(e) => handleMenuOpen(e, r)}
                        sx={{ color: "#FF6A00" }}
                      >
                        <MoreVert />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography sx={{ color: "gray" }}>
                    No restaurants found 😔
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Menu Actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
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
          <Visibility sx={{ mr: 1, color: "#2196F3" }} /> View Details
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleApprove(selectedRestaurant)}>
          <CheckCircle sx={{ mr: 1, color: "#4CAF50" }} /> Approve
        </MenuItem>
        <MenuItem onClick={() => handleReject(selectedRestaurant)}>
          <Block sx={{ mr: 1, color: "#F44336" }} /> Reject
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete}>
          <Delete sx={{ mr: 1, color: "#EE0979" }} /> Delete
        </MenuItem>
      </Menu>

      {/* Approval Modal */}
      <ApprovalModal
        open={approvalModalOpen}
        handleClose={() => setApprovalModalOpen(false)}
        restaurant={selectedRestaurant}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </motion.div>
  );
};

export default RestaurantTable;

// import React from "react";
// import Sidebar from "../Layout/Sidebar";
// import TopBar from "../Layout/TopBar";
// import RestaurantTable from "./RestaurantTable";
// import { Box } from "@mui/material";

// const AdminRestaurantPage = () => {
//   return (
//     <Box sx={{ display: "flex" }}>
//       <Sidebar />
//       <Box sx={{ flexGrow: 1 }}>
//         <TopBar />
//         <Box sx={{ mt: 10, p: 3 }}>
//           <RestaurantTable />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AdminRestaurantPage;

// useEffect(() => {
//   axios.get("/api/admin/restaurants").then((res) => setRestaurants(res.data));
// }, []);

// const handleApprove = async (r) => {
//   await axios.put(`/api/admin/restaurants/${r.id}/approve`);
// };
// const handleReject = async (r) => {
//   await axios.put(`/api/admin/restaurants/${r.id}/reject`);
// };
