// components/restaurant/Management/FoodList.jsx
import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
  IconButton,
  Typography,
  Chip,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import "bootstrap/dist/css/bootstrap.min.css";

const FoodList = () => {
  const [search, setSearch] = useState("");

  const [foods, setFoods] = useState([
    {
      id: 1,
      name: "Paneer Butter Masala",
      image:
        "https://images.unsplash.com/photo-1601050690597-31c4b43e4d07?auto=format&fit=crop&w=800&q=80",
      category: "North Indian",
      price: 220,
      available: true,
    },
    {
      id: 2,
      name: "Margherita Pizza",
      image:
        "https://images.unsplash.com/photo-1601924582971-b8d3da0b336f?auto=format&fit=crop&w=800&q=80",
      category: "Italian",
      price: 350,
      available: true,
    },
    {
      id: 3,
      name: "Veg Fried Rice",
      image:
        "https://images.unsplash.com/photo-1633140846760-8a9f8b77cc42?auto=format&fit=crop&w=800&q=80",
      category: "Chinese",
      price: 180,
      available: false,
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item? ❌")) {
      setFoods(foods.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (id) => {
    alert(`Editing food item ID: ${id}`);
  };

  const handleAdd = () => {
    alert("Redirect to Add New Food Form 🍕");
  };

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container my-5">
      {/* Header */}
      <Box
        className="d-flex justify-content-between align-items-center mb-4"
        sx={{
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#FF6A00" }}>
          🍴 Food Menu Management
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search Food..."
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

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#FF6A00",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "50px",
              textTransform: "none",
              "&:hover": { backgroundColor: "#EE0979" },
            }}
            onClick={handleAdd}
          >
            Add Food
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: "16px" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#FF6A00" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Image</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Price (₹)</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Actions</TableCell>
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
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(food.id)}
                      sx={{ color: "#FF6A00" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(food.id)}
                      sx={{ color: "#EE0979" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography sx={{ color: "gray" }}>
                    No food items found 😔
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FoodList;

// import React from "react";
// import Sidebar from "../DashboardCommon/Sidebar";
// import DashboardHeader from "../DashboardCommon/DashboardHeader";
// import FoodList from "./FoodList";
// import { Box } from "@mui/material";

// const FoodManagementPage = () => {
//   return (
//     <Box sx={{ display: "flex" }}>
//       <Sidebar />
//       <Box component="main" sx={{ flexGrow: 1, mt: 10, p: 3 }}>
//         <DashboardHeader restaurantName="Bharat’s Kitchen" />
//         <FoodList />
//       </Box>
//     </Box>
//   );
// };

// export default FoodManagementPage;

// Example using Axios
// useEffect(() => {
//   axios.get("/api/restaurant/foods").then(res => setFoods(res.data));
// }, []);
