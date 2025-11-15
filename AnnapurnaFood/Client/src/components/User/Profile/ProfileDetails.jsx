// components/user/ProfileDetail.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileDetail = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Bharat Sahu",
    email: "bharat@example.com",
    phone: "+91 9876543210",
    address: "123, Indore, Madhya Pradesh",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile details saved successfully ✅");
    // You can later connect this to backend API
  };

  return (
    <div className="container my-5">
      <Card
        className="shadow-sm border-0"
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          maxWidth: "700px",
          margin: "auto",
        }}
      >
        <CardContent>
          <div className="text-center mb-4">
            <Avatar
              alt={profile.name}
              src={profile.image}
              sx={{
                width: 100,
                height: 100,
                margin: "auto",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mt: 2, color: "#333" }}
            >
              {profile.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              FoodieApp User
            </Typography>
          </div>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {/* Name */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                Full Name
              </Typography>
              <TextField
                fullWidth
                name="name"
                variant="outlined"
                size="small"
                value={profile.name}
                disabled={!isEditing}
                onChange={handleChange}
                sx={{ backgroundColor: isEditing ? "#fff" : "#f9f9f9" }}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                Email Address
              </Typography>
              <TextField
                fullWidth
                name="email"
                variant="outlined"
                size="small"
                value={profile.email}
                disabled={!isEditing}
                onChange={handleChange}
                sx={{ backgroundColor: isEditing ? "#fff" : "#f9f9f9" }}
              />
            </Grid>

            {/* Phone */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                Phone Number
              </Typography>
              <TextField
                fullWidth
                name="phone"
                variant="outlined"
                size="small"
                value={profile.phone}
                disabled={!isEditing}
                onChange={handleChange}
                sx={{ backgroundColor: isEditing ? "#fff" : "#f9f9f9" }}
              />
            </Grid>

            {/* Address */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                Address
              </Typography>
              <TextField
                fullWidth
                name="address"
                variant="outlined"
                size="small"
                multiline
                rows={2}
                value={profile.address}
                disabled={!isEditing}
                onChange={handleChange}
                sx={{ backgroundColor: isEditing ? "#fff" : "#f9f9f9" }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <div className="text-end">
            {isEditing ? (
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{
                  backgroundColor: "#FF6A00",
                  px: 3,
                  py: 1,
                  borderRadius: "50px",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#EE0979" },
                }}
                onClick={handleSave}
              >
                Save Changes
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{
                  color: "#FF6A00",
                  borderColor: "#FF6A00",
                  px: 3,
                  py: 1,
                  borderRadius: "50px",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "rgba(255,106,0,0.1)" },
                }}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDetail;
