// components/restaurant/Management/FoodList.jsx
import React, { useContext, useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { FoodContext } from "../../../context/Foodcontext";
export const FoodList = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { fetchFoodByRestaurant, loading, foods, deleteFood } =
    useContext(FoodContext);

  const id = localStorage.getItem("restarantId");
  useEffect(() => {
    if (id) {
      fetchFoodByRestaurant(id);
    }
  });
  const handleDelete = (id) => {
    if (id) {
      deleteFood(id);
    } else {
      alert("id de do  delete karna hay");
    }
  };

  const handleEdit = (food) => {
    console.log("food data :", food);
    navigate("/dashboard/edit-food", { state: { update: food } });
  };

  const handleAdd = () => {
    alert("Redirect to Add New Food Form 🍕");
  };

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container m-5">
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
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                Image
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                Category
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                Price (₹)
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
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
                    },
                  }}
                >
                  <TableCell>
                    <img
                      src={`http://localhost:2000/upload/${food.image}`}
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
                      label={food.isAvailable ? "Available" : "Unavailable"}
                      sx={{
                        backgroundColor: food.isAvailable
                          ? "rgba(76,175,80,0.1)"
                          : "rgba(244,67,54,0.1)",
                        color: food.isAvailable ? "#4CAF50" : "#F44336",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(food)}
                      sx={{ color: "#FF6A00" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(food._id)}
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
