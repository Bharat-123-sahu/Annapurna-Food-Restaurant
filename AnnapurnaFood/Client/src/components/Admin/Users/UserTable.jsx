// components/Admin/Users/UserTable.jsx
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
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Box,
} from "@mui/material";
import {
  Search,
  MoreVert,
  Visibility,
  Block,
  Delete,
  CheckCircle,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const UserTable = () => {
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rohit Sharma",
      email: "rohitsharma@gmail.com",
      phone: "+91 9876543210",
      avatar: "https://cdn-icons-png.flaticon.com/512/706/706830.png",
      status: "Active",
      joined: "2025-03-12",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priyasingh@gmail.com",
      phone: "+91 9988776655",
      avatar: "https://cdn-icons-png.flaticon.com/512/194/194938.png",
      status: "Blocked",
      joined: "2025-02-04",
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amitpatel@gmail.com",
      phone: "+91 9123456789",
      avatar: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
      status: "Active",
      joined: "2025-01-21",
    },
  ]);

  // Menu Controls
  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleView = () => {
    alert(`👀 Viewing details of ${selectedUser.name}`);
    handleMenuClose();
  };

  const handleBlock = () => {
    const updatedUsers = users.map((u) =>
      u.id === selectedUser.id
        ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" }
        : u
    );
    setUsers(updatedUsers);
    alert(
      selectedUser.status === "Active"
        ? `🚫 ${selectedUser.name} blocked`
        : `✅ ${selectedUser.name} unblocked`
    );
    handleMenuClose();
  };

  const handleDelete = () => {
    if (window.confirm("❌ Delete this user?")) {
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      alert("🗑️ User deleted successfully!");
    }
    handleMenuClose();
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusChip = (status) => {
    if (status === "Active") {
      return (
        <Chip
          label="Active"
          sx={{
            backgroundColor: "rgba(76,175,80,0.1)",
            color: "#4CAF50",
            fontWeight: 600,
          }}
        />
      );
    }
    return (
      <Chip
        label="Blocked"
        sx={{
          backgroundColor: "rgba(244,67,54,0.1)",
          color: "#F44336",
          fontWeight: 600,
        }}
      />
    );
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
          👥 User Management
        </Typography>
        <TextField
          size="small"
          placeholder="Search users..."
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
                Avatar
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                Phone
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                Joined
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontWeight: 600, textAlign: "center" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255,106,0,0.05)",
                      transition: "0.3s",
                    },
                  }}
                >
                  <TableCell>
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      sx={{ width: 56, height: 56, borderRadius: "12px" }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{getStatusChip(user.status)}</TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="More">
                      <IconButton
                        onClick={(e) => handleMenuOpen(e, user)}
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
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography sx={{ color: "gray" }}>
                    No users found 😔
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
          <Visibility sx={{ mr: 1, color: "#2196F3" }} /> View Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleBlock}>
          {selectedUser?.status === "Active" ? (
            <>
              <Block sx={{ mr: 1, color: "#F44336" }} /> Block User
            </>
          ) : (
            <>
              <CheckCircle sx={{ mr: 1, color: "#4CAF50" }} /> Unblock User
            </>
          )}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete}>
          <Delete sx={{ mr: 1, color: "#EE0979" }} /> Delete User
        </MenuItem>
      </Menu>
    </motion.div>
  );
};

export default UserTable;

// import React from "react";
// import Sidebar from "../Layout/Sidebar";
// import TopBar from "../Layout/TopBar";
// import UserTable from "./UserTable";
// import { Box } from "@mui/material";

// const AdminUserPage = () => {
//   return (
//     <Box sx={{ display: "flex" }}>
//       <Sidebar />
//       <Box sx={{ flexGrow: 1 }}>
//         <TopBar />
//         <Box sx={{ mt: 10, p: 3 }}>
//           <UserTable />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AdminUserPage;

// useEffect(() => {
//   axios.get("/api/admin/users").then((res) => setUsers(res.data));
// }, []);

// const handleBlock = async (user) => {
//   await axios.put(`/api/admin/users/${user.id}/toggle-block`);
// };
// const handleDelete = async (user) => {
//   await axios.delete(`/api/admin/users/${user.id}`);
// };
