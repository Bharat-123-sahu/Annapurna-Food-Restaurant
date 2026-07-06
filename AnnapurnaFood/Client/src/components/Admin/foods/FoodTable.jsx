// components/Admin/Foods/FoodTables.jsx
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
  Button,
  TextField,
  InputAdornment,
  Box,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import "bootstrap/dist/css/bootstrap.min.css";

const FoodTables = () => {
  const [search, setSearch] = useState("");

  const [foods, setFoods] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      category: "Italian",
      price: 299,
      available: true,
      restaurant: "Bharat’s Kitchen",
      image:
        "https://images.unsplash.com/photo-1601924582971-b8d3da0b336f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Paneer Butter Masala",
      category: "North Indian",
      price: 240,
      available: true,
      restaurant: "Tandoor Express",
      image:
        "https://images.unsplash.com/photo-1601050690597-31c4b43e4d07?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Veg Fried Rice",
      category: "Chinese",
      price: 180,
      available: false,
      restaurant: "Wok Street",
      image:
        "https://images.unsplash.com/photo-1633140846760-8a9f8b77cc42?auto=format&fit=crop&w=800&q=80",
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("❌ Are you sure you want to delete this food item?")) {
      setFoods(foods.filter((f) => f.id !== id));
      alert("✅ Food item deleted successfully!");
    }
  };

  const handleEdit = (id) => {
    alert(`✏️ Editing food ID: ${id}`);
  };

  const handleView = (id) => {
    alert(`👀 Viewing food details ID: ${id}`);
  };

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container my-5">
      {/* Header */}
      <Box
        className="d-flex justify-content-between align-items-center flex-wrap mb-4"
        sx={{ gap: 2 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#FF6A00" }}>
          🍴 All Food Items
        </Typography>
        <TextField
          size="small"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#FF6A00" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: { xs: "100%", sm: "250px" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
            },
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
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Image</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Food Name</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Restaurant</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Price (₹)</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Availability</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600, textAlign: "center" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredFoods.length > 0 ? (
              filteredFoods.map((food) => (
                <TableRow
                  key={food.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255,106,0,0.05)",
                      transition: "0.3s",
                    },
                  }}
                >
                  <TableCell>
                    <img
                      src={food.image}
                      alt={food.name}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>

                  <TableCell sx={{ fontWeight: 600 }}>{food.name}</TableCell>
                  <TableCell>{food.category}</TableCell>
                  <TableCell sx={{ color: "#333" }}>{food.restaurant}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>₹{food.price}</TableCell>
                  <TableCell>
                    <Chip
                      label={food.available ? "Available" : "Unavailable"}
                      sx={{
                        backgroundColor: food.available
                          ? "rgba(76,175,80,0.1)"
                          : "rgba(244,67,54,0.1)",
                        color: food.available ? "#4CAF50" : "#F44336",
                        fontWeight: 600,
                        borderRadius: "6px",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View">
                      <IconButton onClick={() => handleView(food.id)} sx={{ color: "#2196F3" }}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEdit(food.id)} sx={{ color: "#FF6A00" }}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(food.id)} sx={{ color: "#EE0979" }}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography sx={{ color: "gray" }}>No food items found 😔</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FoodTables;

// import React from "react";
// import Sidebar from "../DashboardCommon/Sidebar";
// import DashboardHeader from "../DashboardCommon/DashboardHeader";
// import FoodTables from "./FoodTables";
// import { Box } from "@mui/material";

// const AdminFoodPage = () => {
//   return (
//     <Box sx={{ display: "flex" }}>
//       <Sidebar />
//       <Box component="main" sx={{ flexGrow: 1, mt: 10, p: 3 }}>
//         <DashboardHeader restaurantName="Admin Food Management" />
//         <FoodTables />
//       </Box>
//     </Box>
//   );
// };

// export default AdminFoodPage;

// useEffect(() => {
//   axios.get("/api/admin/foods").then((res) => setFoods(res.data));
// }, []);
