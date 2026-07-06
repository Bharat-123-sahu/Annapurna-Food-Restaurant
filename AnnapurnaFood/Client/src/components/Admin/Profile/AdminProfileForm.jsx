// components/Admin/Profile/AdminProfile.jsx
import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  FormControlLabel,
  Switch,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "Bharat Sahu",
    email: "admin@foodhub.com",
    phone: "+91 9876543210",
    role: "Super Admin",
    joined: "March 12, 2024",
    image: "https://cdn-icons-png.flaticon.com/512/706/706830.png",
  });
  const [preview, setPreview] = useState(profile.image);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
      setProfile({ ...profile, image: file });
    }
  };

  const handleSave = () => {
    alert("✅ Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <motion.div
      className="container my-5"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        className="shadow-lg border-0"
        sx={{
          borderRadius: "20px",
          overflow: "hidden",
          maxWidth: "800px",
          margin: "auto",
          background: darkMode
            ? "linear-gradient(135deg, #232526, #414345)"
            : "linear-gradient(135deg, #fff, #fff)",
          color: darkMode ? "#fff" : "#333",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box
            className="d-flex justify-content-between align-items-center flex-wrap mb-4"
            sx={{ gap: 2 }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: darkMode ? "#FF6A00" : "#FF6A00",
              }}
            >
              👤 Admin Profile
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
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
                <Typography
                  sx={{ fontWeight: 600, color: darkMode ? "#fff" : "#333" }}
                >
                  Dark Mode
                </Typography>
              }
            />
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Profile Section */}
          <Box className="text-center mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Avatar
                src={preview}
                alt="Admin"
                sx={{
                  width: 120,
                  height: 120,
                  margin: "auto",
                  border: "3px solid #FF6A00",
                  mb: 2,
                }}
              />
            </motion.div>

            {isEditing && (
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
                  "&:hover": {
                    backgroundColor: "rgba(255,106,0,0.1)",
                  },
                  mb: 2,
                }}
              >
                Upload New
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            )}

            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {profile.name}
            </Typography>
            <Typography sx={{ color: darkMode ? "#ccc" : "gray" }}>
              {profile.role}
            </Typography>
          </Box>

          {/* Editable Form */}
          <form>
            <div className="row g-3">
              <div className="col-md-6">
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  size="small"
                  variant="outlined"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  InputLabelProps={{
                    style: { color: darkMode ? "#fff" : "#555" },
                  }}
                  sx={{
                    input: { color: darkMode ? "#fff" : "#333" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: darkMode ? "#888" : "#ccc",
                      },
                    },
                  }}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  size="small"
                  type="email"
                  variant="outlined"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  InputLabelProps={{
                    style: { color: darkMode ? "#fff" : "#555" },
                  }}
                  sx={{
                    input: { color: darkMode ? "#fff" : "#333" },
                  }}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  size="small"
                  variant="outlined"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  InputLabelProps={{
                    style: { color: darkMode ? "#fff" : "#555" },
                  }}
                  sx={{
                    input: { color: darkMode ? "#fff" : "#333" },
                  }}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  fullWidth
                  label="Joined On"
                  name="joined"
                  size="small"
                  variant="outlined"
                  value={profile.joined}
                  disabled
                  InputLabelProps={{
                    style: { color: darkMode ? "#fff" : "#555" },
                  }}
                  sx={{
                    input: { color: darkMode ? "#fff" : "#333" },
                  }}
                />
              </div>
            </div>

            {/* Buttons */}
            <Box
              className="d-flex justify-content-end mt-4"
              sx={{ gap: 2, flexWrap: "wrap" }}
            >
              {!isEditing ? (
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => setIsEditing(true)}
                  sx={{
                    backgroundColor: "#FF6A00",
                    color: "#fff",
                    borderRadius: "50px",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#EE0979" },
                  }}
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  sx={{
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    borderRadius: "50px",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#43A047" },
                  }}
                >
                  Save Changes
                </Button>
              )}
            </Box>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminProfile;

// import React from "react";
// import Sidebar from "../Layout/Sidebar";
// import TopBar from "../Layout/TopBar";
// import AdminProfile from "./AdminProfile";
// import { Box } from "@mui/material";

// const AdminProfilePage = () => {
//   return (
//     <Box sx={{ display: "flex" }}>
//       <Sidebar />
//       <Box sx={{ flexGrow: 1 }}>
//         <TopBar />
//         <Box sx={{ mt: 10, p: 3 }}>
//           <AdminProfile />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AdminProfilePage;

// const handleSave = async () => {
//   const formData = new FormData();
//   Object.keys(profile).forEach((key) => formData.append(key, profile[key]));
//   await axios.put("/api/admin/profile", formData);
//   alert("✅ Profile updated successfully!");
// };
