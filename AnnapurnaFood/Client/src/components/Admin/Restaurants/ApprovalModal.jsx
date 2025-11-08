// components/Admin/Restaurants/ApprovalModal.jsx
import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  Chip,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import "bootstrap/dist/css/bootstrap.min.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth: 600,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  overflow: "hidden",
};

const ApprovalModal = ({
  open,
  handleClose,
  restaurant,
  onApprove,
  onReject,
}) => {
  if (!restaurant) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="approval-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, type: "spring" }}
      >
        <Box sx={modalStyle}>
          {/* Header */}
          <Box className="d-flex justify-content-between align-items-center mb-3">
            <Typography
              id="approval-modal-title"
              variant="h6"
              sx={{ fontWeight: 700, color: "#FF6A00" }}
            >
              🏪 Restaurant Approval Request
            </Typography>
            <Button onClick={handleClose} sx={{ color: "#999" }}>
              <CloseIcon />
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Restaurant Info */}
          <Box className="text-center mb-4">
            <Avatar
              src={restaurant.image}
              alt={restaurant.name}
              sx={{
                width: 90,
                height: 90,
                margin: "auto",
                border: "3px solid #FF6A00",
                mb: 2,
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {restaurant.name}
            </Typography>
            <Typography sx={{ color: "gray", mb: 1 }}>
              Owner: {restaurant.ownerName}
            </Typography>
            <Chip
              label={restaurant.status || "Pending Approval"}
              sx={{
                backgroundColor:
                  restaurant.status === "Approved"
                    ? "rgba(76,175,80,0.1)"
                    : restaurant.status === "Rejected"
                    ? "rgba(244,67,54,0.1)"
                    : "rgba(255,152,0,0.1)",
                color:
                  restaurant.status === "Approved"
                    ? "#4CAF50"
                    : restaurant.status === "Rejected"
                    ? "#F44336"
                    : "#FF9800",
                fontWeight: 600,
                mt: 1,
              }}
            />
          </Box>

          {/* Details Section */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                📍 Address:
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                {restaurant.address || "Not provided"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                ☎️ Contact:
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                {restaurant.phone || "Not provided"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                📧 Email:
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                {restaurant.email || "Not provided"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                🕒 Opening Hours:
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                {restaurant.hours || "10:00 AM - 10:00 PM"}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* Action Buttons */}
          <Box
            className="d-flex justify-content-end align-items-center"
            sx={{ gap: 2, flexWrap: "wrap" }}
          >
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={() => {
                if (window.confirm("❌ Reject this restaurant?"))
                  onReject(restaurant);
              }}
              sx={{
                borderColor: "#F44336",
                color: "#F44336",
                borderRadius: "50px",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "rgba(244,67,54,0.1)",
                },
              }}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              startIcon={<CheckCircleIcon />}
              onClick={() => {
                if (window.confirm("✅ Approve this restaurant?"))
                  onApprove(restaurant);
              }}
              sx={{
                backgroundColor: "#4CAF50",
                color: "#fff",
                borderRadius: "50px",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#43A047",
                },
              }}
            >
              Approve
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Modal>
  );
};

export default ApprovalModal;

// import React, { useState } from "react";
// import ApprovalModal from "./ApprovalModal";
// import { Button } from "@mui/material";

// const AdminRestaurantPage = () => {
//   const [open, setOpen] = useState(false);

//   const restaurant = {
//     name: "The Royal Feast",
//     ownerName: "Ankit Sharma",
//     phone: "+91 9898989898",
//     email: "royalfeast@gmail.com",
//     address: "Vijay Nagar, Indore, MP",
//     image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
//     status: "Pending",
//     hours: "9 AM - 11 PM",
//   };

//   const handleApprove = (data) => {
//     console.log("✅ Approved:", data);
//     alert(`Restaurant "${data.name}" approved successfully!`);
//     setOpen(false);
//   };

//   const handleReject = (data) => {
//     console.log("❌ Rejected:", data);
//     alert(`Restaurant "${data.name}" rejected.`);
//     setOpen(false);
//   };

//   return (
//     <div className="text-center my-5">
//       <Button
//         variant="contained"
//         onClick={() => setOpen(true)}
//         sx={{
//           backgroundColor: "#FF6A00",
//           "&:hover": { backgroundColor: "#EE0979" },
//         }}
//       >
//         Open Approval Modal
//       </Button>

//       <ApprovalModal
//         open={open}
//         handleClose={() => setOpen(false)}
//         restaurant={restaurant}
//         onApprove={handleApprove}
//         onReject={handleReject}
//       />
//     </div>
//   );
// };

// export default AdminRestaurantPage;

// const handleApprove = async (restaurant) => {
//   await axios.put(`/api/admin/restaurants/${restaurant.id}/approve`);
//   alert("✅ Approved successfully!");
// };
// const handleReject = async (restaurant) => {
//   await axios.put(`/api/admin/restaurants/${restaurant.id}/reject`);
// };
