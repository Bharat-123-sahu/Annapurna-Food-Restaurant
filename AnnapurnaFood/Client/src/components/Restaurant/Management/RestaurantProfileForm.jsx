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
import { RestaurantContext } from "../../../context/restaurantdata";
import { useContext } from "react";
import { useEffect } from "react";
export const RestaurantProfileForm = ({ initialData, onSave }) => {
  const { restaurants, loading, fetchRestaurantById, updateRestaurant } =
    useContext(RestaurantContext);

  const restid = localStorage.getItem("restarantId");

  // form state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    openingHours: "10:00 AM - 11:00 PM",
    logo: null, // either filename string OR File object
    poster: null, // either filename string OR File object
    open: true,
  });

  // preview URLs (either remote URL or local object URL)
  const [previewLogo, setPreviewLogo] = useState(null);
  const [previewPoster, setPreviewposter] = useState(null);

  // 1) initial fetch: load restaurant by id once
  useEffect(() => {
    if (restid) {
      fetchRestaurantById(restid);
    }
  }, [restid, fetchRestaurantById]);

  // 2) when restaurant data arrives, fill the form and previews
  useEffect(() => {
    if (restaurants && restaurants.name) {
      setProfile((prev) => ({
        ...prev,
        name: restaurants.name || "",
        email: restaurants.email || "",
        phone: restaurants.phone || "",
        address: restaurants.address || "",
        openingHours: restaurants.openingHours || "10:00 AM - 11:00 PM",
        // keep backend-stored filename strings here so we know current file
        logo: restaurants.logo || null,
        poster: restaurants.poster || null,
        open: restaurants.open ?? true,
      }));

      setPreviewLogo(
        restaurants.logo
          ? `http://localhost:2000/uploads/${restaurants.logo}`
          : null
      );
      setPreviewposter(
        restaurants.poster
          ? `http://localhost:2000/uploads/${restaurants.poster}`
          : null
      );
    }
  }, [restaurants]);

  // text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  // file inputs
  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // set file object into profile so we can send it later
    setProfile((p) => ({ ...p, [type]: file }));

    // show instant preview
    const previewURL = URL.createObjectURL(file);
    if (type === "logo") setPreviewLogo(previewURL);
    if (type === "poster") setPreviewposter(previewURL);
  };

  // FORM SUBMIT: build FormData and call updateRestaurant
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!restid) {
      alert("Restaurant id missing");
      return;
    }

    // build FormData
    const formData = new FormData();

    // Append text fields
    formData.append("name", profile.name || "");
    formData.append("email", profile.email || "");
    formData.append("phone", profile.phone || "");
    formData.append("address", profile.address || "");
    formData.append("openingHours", profile.openingHours || "");
    formData.append("open", profile.open ? "true" : "false");

    // Append files only if they are File objects (i.e. user selected new files)
    if (profile.logo instanceof File) {
      formData.append("logo", profile.logo);
    }
    // If logo is filename string (no new file chosen), do NOT append. Backend should keep existing file.
    if (profile.poster instanceof File) {
      formData.append("poster", profile.poster);
    }

    // Call context updater (make sure it handles FormData)
    try {
      updateRestaurant(restid, formData);
      alert("✅ Restaurant Updated Successfully!");
      if (onSave) onSave(profile);
    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed. See console for details.");
    }
  };

  if (loading) return <div>Loading...</div>;
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
                  name="logo"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "logo")}
                />
              </Button>
            </Box>

            {/* Banner Upload */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              🖼️ Banner Image
            </Typography>
            <Box className="text-center mb-4">
              {previewPoster ? (
                <img
                  src={previewPoster}
                  alt="Poster"
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
                  No Poster selected
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
                Upload Poster
                <input
                  type="file"
                  name="poster"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "poster")}
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
