// components/Admin/Foods/ManageCategoryForm.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  FormControlLabel,
  Switch,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "bootstrap/dist/css/bootstrap.min.css";

const ManageCategoryForm = ({ categoryData, onBack, onSave }) => {
  const [category, setCategory] = useState(
    categoryData || {
      name: "",
      description: "",
      image: "",
      active: true,
    }
  );

  const [preview, setPreview] = useState(category.image);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategory({ ...category, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category.name) {
      alert("⚠️ Category name is required");
      return;
    }

    if (onSave) onSave(category);
    alert("✅ Category saved successfully!");
    setCategory({ name: "", description: "", image: "", active: true });
    setPreview(null);
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
          {/* Header */}
          <Box
            className="d-flex justify-content-between align-items-center mb-3"
            sx={{ flexWrap: "wrap", gap: 2 }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#FF6A00" }}>
              📂 {categoryData ? "Edit Category" : "Add New Category"}
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
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Category Name */}
            <TextField
              fullWidth
              label="Category Name"
              name="name"
              variant="outlined"
              size="small"
              required
              value={category.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            {/* Description */}
            <TextField
              fullWidth
              label="Description"
              name="description"
              variant="outlined"
              size="small"
              multiline
              rows={3}
              value={category.description}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            {/* Image Upload */}
            <Box className="text-center mb-3">
              {preview ? (
                <img
                  src={preview}
                  alt="Category Preview"
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
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            </Box>

            {/* Active Switch */}
            <FormControlLabel
              control={
                <Switch
                  checked={category.active}
                  onChange={(e) =>
                    setCategory({ ...category, active: e.target.checked })
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
                <Typography sx={{ fontWeight: 600, color: "#333" }}>
                  Active Category
                </Typography>
              }
              sx={{ mb: 3 }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              fullWidth
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
              {categoryData ? "Update Category" : "Add Category"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageCategoryForm;

// import React, { useState } from "react";
// import ManageCategoryForm from "./ManageCategoryForm";
// import { Box } from "@mui/material";

// const ManageCategoryPage = () => {
//   const [editMode, setEditMode] = useState(false);

//   const handleSave = (data) => {
//     console.log("Category Saved:", data);
//     alert("✅ Category successfully saved!");
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <ManageCategoryForm
//         categoryData={
//           editMode
//             ? {
//                 name: "Desserts",
//                 description: "Sweet and delicious dishes",
//                 image:
//                   "https://images.unsplash.com/photo-1625231317871-03c7aa3a5ab0?auto=format&fit=crop&w=800&q=80",
//                 active: true,
//               }
//             : null
//         }
//         onSave={handleSave}
//         onBack={() => setEditMode(false)}
//       />
//     </Box>
//   );
// };

// export default ManageCategoryPage;

// const formData = new FormData();
// Object.keys(category).forEach((key) => formData.append(key, category[key]));

// axios.post("/api/admin/categories", formData);
