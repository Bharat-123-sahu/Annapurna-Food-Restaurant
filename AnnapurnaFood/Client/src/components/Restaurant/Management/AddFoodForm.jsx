// components/restaurant/Management/AddFoodForm.jsx
import React, { useContext, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Switch,
  Box,
  Divider,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "bootstrap/dist/css/bootstrap.min.css";
import { FoodContext } from "../../../context/Foodcontext";
// import Sidebar from "../DashboardCommon/Sidebar";

export const AddFoodForm = () => {
  const { loading } = useContext(FoodContext);
  const [food, setFood] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    isAvailable: true,
    image: null,
  });

  const categories = [
    "North Indian",
    "South Indian",
    "Italian",
    "Chinese",
    "Dessert",
    "Beverage",
  ];

  const handleChange = (e) => {
    const { name, type, checked, value, files } = e.target;

    setFood({
      ...food,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const restaurantID = localStorage.getItem("restarantId");
    const fd = new FormData();
    if (food.image) {
      fd.append("image", food.image);
    }
    fd.append("name", food.name);
    fd.append("description", food.description);
    fd.append("category", food.category);
    fd.append("price", food.price);
    fd.append("available", food.isAvailable);

    try {
      loading;
      const res = await axios.post(
        `http://localhost:2000/food/add/${restaurantID}`,
        fd,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }, // Axios will set boundary automatically
        }
      );
      console.log(res.data);
      console.log(food.image);
      alert("food added successful");
      if (res.data.message === "food added successfull") {
        alert("done ✅");
      }
    } catch (err) {
      alert("some error occoured", err);
      console.log("error ocdcored", err.message);
      console.log("error ocdcored", err.message.response);
      console.log(food.image);
    }
  };

  return (
    <div className="container my-5">
      <Card
        className="shadow-lg border-0"
        sx={{
          borderRadius: "20px",
          overflow: "hidden",
          maxWidth: "700px",
          margin: "auto",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#FF6A00" }}>
              🍔 Add New Food Item
            </Typography>
          </div>

          <Divider sx={{ mb: 3 }} />

          <form onSubmit={handleSubmit}>
            {/* Food Name */}
            <TextField
              fullWidth
              name="name"
              label="Food Name"
              variant="outlined"
              size="small"
              required
              value={food.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            {/* Description */}
            <TextField
              fullWidth
              name="description"
              label="Description"
              variant="outlined"
              size="small"
              multiline
              rows={3}
              value={food.description}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            {/* Category + Price */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <TextField
                  select
                  fullWidth
                  name="category"
                  label="Category"
                  variant="outlined"
                  size="small"
                  required
                  value={food.category}
                  onChange={handleChange}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="col-md-6 mb-3">
                <TextField
                  fullWidth
                  name="price"
                  label="Price (₹)"
                  variant="outlined"
                  size="small"
                  required
                  type="number"
                  value={food.price}
                  onChange={handleChange}
                  inputProps={{ min: 0 }}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="text-center mb-3">
              {food.image ? (
                <img
                  src={`http://localhost:2000/upload/${food.image}`}
                  alt="Food Preview"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    marginBottom: "10px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                  }}
                />
              ) : (
                <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
                  No image selected
                </Typography>
              )}

              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{
                  borderColor: "#FF6A00",
                  color: "#FF6A00",
                  borderRadius: "50px",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "rgba(255,106,0,0.1)" },
                }}
              >
                Upload Image
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                />
              </Button>
            </div>

            {/* Availability Switch */}
            <FormControlLabel
              control={
                <Switch
                  checked={food.isAvailable}
                  onChange={(e) =>
                    setFood({ ...food, isAvailable: e.target.checked })
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#FF6A00",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#FF6A00",
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ color: "#333", fontWeight: 600 }}>
                  {food.isAvailable ? "Available" : "Unavailable"}
                </Typography>
              }
              sx={{ mb: 2 }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#FF6A00",
                color: "#fff",
                borderRadius: "50px",
                textTransform: "none",
                fontWeight: 600,
                py: 1.2,
                "&:hover": { backgroundColor: "#EE0979" },
              }}
            >
              Add Food Item
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// import React, { useState } from "react";
// import Sidebar from "../DashboardCommon/Sidebar";
// import DashboardHeader from "../DashboardCommon/DashboardHeader";
// import AddFoodForm from "./AddFoodForm";
// import FoodList from "./FoodList";
// import { Box } from "@mui/material";

// const FoodManagementPage = () => {
//   const [showForm, setShowForm] = useState(false);

//   const handleSubmit = (data) => {
//     console.log("New Food Item:", data);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <Sidebar />
//       <Box component="main" sx={{ flexGrow: 1, mt: 10, p: 3 }}>
//         <DashboardHeader restaurantName="Bharat’s Kitchen" />
//         {showForm ? (
//           <AddFoodForm
//             onBack={() => setShowForm(false)}
//             onSubmit={handleSubmit}
//           />
//         ) : (
//           <FoodList />
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default FoodManagementPage;

// const formData = new FormData();
// formData.append("name", food.name);
// formData.append("price", food.price);
// formData.append("image", food.image);
// await axios.post("/api/restaurant/foods", formData);
