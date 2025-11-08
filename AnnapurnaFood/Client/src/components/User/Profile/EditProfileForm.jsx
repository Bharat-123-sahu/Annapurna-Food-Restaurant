// components/user/EditProfileForm.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import "bootstrap/dist/css/bootstrap.min.css";

const EditProfileForm = ({ open, onClose, userData, onSave }) => {
  const [formData, setFormData] = useState(userData || {});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (onSave) onSave(formData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "16px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          textAlign: "center",
          color: "#FF6A00",
          borderBottom: "1px solid #eee",
        }}
      >
        Edit Profile ✏️
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          {/* Full Name */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Full Name
            </Typography>
            <TextField
              fullWidth
              name="name"
              variant="outlined"
              size="small"
              value={formData.name || ""}
              onChange={handleChange}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Email Address
            </Typography>
            <TextField
              fullWidth
              name="email"
              variant="outlined"
              size="small"
              value={formData.email || ""}
              onChange={handleChange}
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Phone Number
            </Typography>
            <TextField
              fullWidth
              name="phone"
              variant="outlined"
              size="small"
              value={formData.phone || ""}
              onChange={handleChange}
            />
          </Grid>

          {/* Address */}
          <Grid item xs={12} sm={6}>
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
              value={formData.address || ""}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2, borderTop: "1px solid #eee" }}>
        <Button
          variant="outlined"
          startIcon={<CloseIcon />}
          onClick={onClose}
          sx={{
            color: "#FF6A00",
            borderColor: "#FF6A00",
            textTransform: "none",
            borderRadius: "50px",
            fontWeight: 600,
            "&:hover": { backgroundColor: "rgba(255,106,0,0.1)" },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{
            backgroundColor: "#FF6A00",
            color: "#fff",
            textTransform: "none",
            borderRadius: "50px",
            fontWeight: 600,
            px: 3,
            "&:hover": { backgroundColor: "#EE0979" },
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileForm;

// import React, { useState } from "react";
// import { Button, Typography, Avatar, Card, CardContent } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import EditProfileForm from "./EditProfileForm";

// const ProfileDetail = () => {
//   const [open, setOpen] = useState(false);
//   const [profile, setProfile] = useState({
//     name: "Bharat Sahu",
//     email: "bharat@example.com",
//     phone: "+91 9876543210",
//     address: "123, Indore, Madhya Pradesh",
//     image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
//   });

//   const handleSave = (updatedData) => {
//     setProfile(updatedData);
//     alert("Profile updated successfully ✅");
//   };

//   return (
//     <div className="container my-5">
//       <Card className="shadow-sm border-0" sx={{ borderRadius: "16px", maxWidth: "700px", margin: "auto" }}>
//         <CardContent className="text-center">
//           <Avatar src={profile.image} sx={{ width: 100, height: 100, margin: "auto" }} />
//           <Typography variant="h5" sx={{ fontWeight: 700, mt: 2 }}>
//             {profile.name}
//           </Typography>
//           <Typography variant="body2" sx={{ color: "gray" }}>
//             {profile.email}
//           </Typography>
//           <Typography variant="body2" sx={{ color: "gray" }}>
//             {profile.phone}
//           </Typography>
//           <Typography variant="body2" sx={{ color: "gray", mb: 3 }}>
//             {profile.address}
//           </Typography>

//           <Button
//             variant="outlined"
//             startIcon={<EditIcon />}
//             onClick={() => setOpen(true)}
//             sx={{
//               color: "#FF6A00",
//               borderColor: "#FF6A00",
//               borderRadius: "50px",
//               fontWeight: 600,
//               px: 3,
//               "&:hover": { backgroundColor: "rgba(255,106,0,0.1)" },
//             }}
//           >
//             Edit Profile
//           </Button>
//         </CardContent>
//       </Card>

//       <EditProfileForm
//         open={open}
//         onClose={() => setOpen(false)}
//         userData={profile}
//         onSave={handleSave}
//       />
//     </div>
//   );
// };

// export default ProfileDetail;
