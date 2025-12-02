// components/restaurant/Management/RestaurantProfileForm.jsx
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
  Avatar,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../DashboardCommon/Sidebar";

export const RestaurantProfileForm = ({ initialData, onSave }) => {
  const [profile, setProfile] = useState(
    initialData || {
      name: "Bharat’s Kitchen",
      email: "bharatkitchen@example.com",
      phone: "9876543210",
      address: "Vijay Nagar, Indore, MP",
      openingHours: "10:00 AM - 11:00 PM",
      image: "",
      banner: "",
      open: true,
    }
  );

  const [previewLogo, setPreviewLogo] = useState(profile.image);
  const [previewBanner, setPreviewBanner] = useState(profile.banner);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setProfile({ ...profile, [type]: file });
      if (type === "image") setPreviewLogo(previewURL);
      if (type === "banner") setPreviewBanner(previewURL);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Restaurant Profile Updated Successfully!");
    if (onSave) onSave(profile);
  };

  return (
    <div className="container my-5">
      <Card
        className="shadow-lg border-0"
        sx={{
          borderRadius: "20px",
          overflow: "hidden",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#FF6A00", mb: 2 }}
          >
            🏪 Restaurant Profile
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <form onSubmit={handleSubmit}>
            {/* Row 1: Name + Email */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <TextField
                  fullWidth
                  label="Restaurant Name"
                  name="name"
                  variant="outlined"
                  size="small"
                  required
                  value={profile.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  variant="outlined"
                  size="small"
                  type="email"
                  required
                  value={profile.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Row 2: Phone + Opening Hours */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  variant="outlined"
                  size="small"
                  required
                  value={profile.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <TextField
                  fullWidth
                  label="Opening Hours"
                  name="openingHours"
                  variant="outlined"
                  size="small"
                  placeholder="10:00 AM - 11:00 PM"
                  value={profile.openingHours}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Address */}
            <TextField
              fullWidth
              label="Address"
              name="address"
              variant="outlined"
              size="small"
              multiline
              rows={2}
              required
              value={profile.address}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            {/* Logo Upload */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              🍴 Restaurant Logo
            </Typography>
            <Box className="text-center mb-3">
              {previewLogo ? (
                <Avatar
                  src={previewLogo}
                  alt="Restaurant Logo"
                  sx={{
                    width: 100,
                    height: 100,
                    mx: "auto",
                    border: "2px solid #FF6A00",
                    mb: 2,
                  }}
                />
              ) : (
                <Typography sx={{ color: "gray", mb: 1 }}>
                  No logo selected
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
                Upload Logo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "image")}
                />
              </Button>
            </Box>

            {/* Banner Upload */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              🖼️ Banner Image
            </Typography>
            <Box className="text-center mb-4">
              {previewBanner ? (
                <img
                  src={previewBanner}
                  alt="Banner"
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                    marginBottom: "10px",
                  }}
                />
              ) : (
                <Typography sx={{ color: "gray", mb: 1 }}>
                  No banner selected
                </Typography>
              )}
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{
                  borderColor: "#EE0979",
                  color: "#EE0979",
                  borderRadius: "50px",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "rgba(238,9,121,0.1)" },
                }}
              >
                Upload Banner
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "banner")}
                />
              </Button>
            </Box>

            {/* Availability Switch */}
            <FormControlLabel
              control={
                <Switch
                  checked={profile.open}
                  onChange={(e) =>
                    setProfile({ ...profile, open: e.target.checked })
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": { color: "#FF6A00" },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#FF6A00",
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontWeight: 600, color: "#333" }}>
                  Restaurant Open
                </Typography>
              }
            />

            <Divider sx={{ my: 3 }} />

            {/* Save Button */}
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
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// import React from "react";
// import Sidebar from "../DashboardCommon/Sidebar";
// import DashboardHeader from "../DashboardCommon/DashboardHeader";
// import RestaurantProfileForm from "./RestaurantProfileForm";
// import { Box } from "@mui/material";

// const RestaurantProfilePage = () => {
//   const handleSave = (data) => {
//     console.log("Updated Profile:", data);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <Sidebar />
//       <Box component="main" sx={{ flexGrow: 1, mt: 10, p: 3 }}>
//         <DashboardHeader restaurantName="Bharat’s Kitchen" />
//         <RestaurantProfileForm onSave={handleSave} />
//       </Box>
//     </Box>
//   );
// };

// export default RestaurantProfilePage;

// const formData = new FormData();
// Object.keys(profile).forEach((key) => formData.append(key, profile[key]));
// await axios.put("/api/restaurant/profile", formData);
