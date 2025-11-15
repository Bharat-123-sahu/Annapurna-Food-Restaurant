// components/user/AddressManager.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  Chip,
  Tooltip,
} from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import ApartmentIcon from "@mui/icons-material/Apartment";
import "bootstrap/dist/css/bootstrap.min.css";

const AddressManager = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home",
      type: "Home",
      address: "123, MG Road, Indore, Madhya Pradesh",
      isDefault: true,
    },
    {
      id: 2,
      label: "Office",
      type: "Work",
      address: "4th Floor, ABC Plaza, Vijay Nagar, Indore",
      isDefault: false,
    },
  ]);

  const [open, setOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    id: null,
    label: "",
    type: "Home",
    address: "",
  });
  const [editMode, setEditMode] = useState(false);

  const handleOpen = (address = null) => {
    if (address) {
      setNewAddress(address);
      setEditMode(true);
    } else {
      setNewAddress({ id: null, label: "", type: "Home", address: "" });
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (editMode) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === newAddress.id ? newAddress : a))
      );
    } else {
      setAddresses((prev) => [
        ...prev,
        { ...newAddress, id: Date.now(), isDefault: false },
      ]);
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSetDefault = (id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case "Home":
        return <HomeIcon sx={{ color: "#FF6A00" }} />;
      case "Work":
        return <WorkIcon sx={{ color: "#FF6A00" }} />;
      default:
        return <ApartmentIcon sx={{ color: "#FF6A00" }} />;
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#333" }}>
          Manage Addresses 📍
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddLocationAltIcon />}
          sx={{
            backgroundColor: "#FF6A00",
            borderRadius: "50px",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { backgroundColor: "#EE0979" },
          }}
          onClick={() => handleOpen()}
        >
          Add New Address
        </Button>
      </div>

      <div className="row g-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="col-12 col-md-6 col-lg-4">
            <Card
              className="shadow-sm border-0"
              sx={{
                borderRadius: "16px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardContent>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center gap-2">
                    {getAddressIcon(addr.type)}
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {addr.label}
                    </Typography>
                  </div>
                  {addr.isDefault && (
                    <Chip
                      label="Default"
                      color="success"
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  )}
                </div>

                <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
                  {addr.address}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <div className="d-flex justify-content-between align-items-center">
                  <Tooltip title="Edit Address">
                    <IconButton
                      onClick={() => handleOpen(addr)}
                      sx={{ color: "#FF6A00" }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete Address">
                    <IconButton
                      onClick={() => handleDelete(addr.id)}
                      sx={{ color: "#EE0979" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>

                  {!addr.isDefault && (
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: "#FF6A00",
                        color: "#FF6A00",
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "50px",
                        "&:hover": {
                          backgroundColor: "rgba(255,106,0,0.1)",
                        },
                      }}
                      onClick={() => handleSetDefault(addr.id)}
                    >
                      Set Default
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Add / Edit Address Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            fontWeight: 700,
            color: "#FF6A00",
            textAlign: "center",
            borderBottom: "1px solid #eee",
          }}
        >
          {editMode ? "Edit Address" : "Add New Address"}
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Label (e.g., Home, Work)"
            name="label"
            variant="outlined"
            size="small"
            value={newAddress.label}
            onChange={(e) =>
              setNewAddress({ ...newAddress, label: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Full Address"
            name="address"
            variant="outlined"
            size="small"
            multiline
            rows={3}
            value={newAddress.address}
            onChange={(e) =>
              setNewAddress({ ...newAddress, address: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              borderColor: "#FF6A00",
              color: "#FF6A00",
              borderRadius: "50px",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { backgroundColor: "rgba(255,106,0,0.1)" },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: "#FF6A00",
              borderRadius: "50px",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#EE0979" },
            }}
          >
            {editMode ? "Save Changes" : "Add Address"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddressManager;
