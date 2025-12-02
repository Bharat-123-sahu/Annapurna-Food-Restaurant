// components/restaurant/Management/EditFood.jsx
import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Switch,
  Divider,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import "bootstrap/dist/css/bootstrap.min.css";
import { FoodContext } from "../../../context/Foodcontext";
import { useLocation } from "react-router-dom";
import axios from "axios";
export const EditFood = ({ onBack }) => {
  let location = useLocation();
  const update = location.state?.update || {};
  const { fetchFoodById, foods, updateFood, loading } = useContext(FoodContext);

  const [food, setFood] = useState({
    name: update.name || "",
    description: update.description || "",
    category: update.category || "",
    price: update.price || "",
    available: update.available ?? true,
    id: update._id || null,
  });
  // const [preview, setPreview] = useState(null);
  // // useEffect(() => {
  // //   if (food.id) {
  // //     updateFood(food.id);
  // //   }
  // // });
  const categories = [
    "North Indian",
    "South Indian",
    "Italian",
    "Chinese",
    "Dessert",
    "Beverage",
  ];

  // Load existing data

  const handleChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    updateFood(food.id, food);
  };

  // if (food);
  // alert("✅ Food item updated successfully!");

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
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#FF6A00" }}>
              ✏️ Edit Food Item
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
                Back
              </Button>
            )}
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
            {/* <div className="text-center mb-3">
              {preview ? (
                <img
                  src={preview}
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
                Change Image
                <input
                  type="file"
                  hidden
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            </div> */}

            {/* Availability Switch */}
            <FormControlLabel
              control={
                <Switch
                  checked={food.available}
                  onChange={handleChange}
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
                  Available
                </Typography>
              }
              sx={{ mb: 2 }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<SaveIcon />}
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
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// import React, { useState } from "react";
// import EditFood from "./EditFood";
// import FoodList from "./FoodList";

// const FoodEditExample = () => {
//   const [editMode, setEditMode] = useState(false);
//   const [selectedFood, setSelectedFood] = useState({
//     id: 1,
//     name: "Margherita Pizza",
//     description: "Classic cheese pizza with tomato base",
//     category: "Italian",
//     price: 299,
//     available: true,
//     image:
//       "https://images.unsplash.com/photo-1601924582971-b8d3da0b336f?auto=format&fit=crop&w=800&q=80",
//   });

//   const handleUpdate = (updatedFood) => {
//     console.log("Updated Food:", updatedFood);
//     alert(`✅ ${updatedFood.name} updated successfully!`);
//     setEditMode(false);
//   };

//   return (
//     <div>
//       {editMode ? (
//         <EditFood
//          ={selectedFood}
//           onBack={() => setEditMode(false)}
//         ={handleUpdate}
//         />
//       ) : (
//         <FoodList />
//       )}
//     </div>
//   );
// };

// export default FoodEditExample;

// // PUT /api/restaurant/food/:id
// const formData = new FormData();
// Object.keys(food).forEach((key) => formData.append(key, food[key]));
// await axios.put(`/api/restaurant/food/${food._id}`, formData);
