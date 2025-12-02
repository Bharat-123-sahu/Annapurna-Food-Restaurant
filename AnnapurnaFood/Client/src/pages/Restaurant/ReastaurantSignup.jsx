import React, { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { RestaurantContext } from "../../context/restaurantdata";
import { Toast } from "react-bootstrap";

const RestaurantRegister = () => {
  const { loading } = useContext(RestaurantContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    ownerName: "",
    email: "",
    phone: "",
    cuisine: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    password: "",
    isOpen: true,
    logo: null,
  });

  // ✅ FIXED handleChange
  const handleChange = (e) => {
    const { name, type, checked, value, files } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };
  const handleError = (err) =>
    toast.error(err, { position: "bottom-left", autoClose: 3000 });

  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-left", autoClose: 2000 });
  // ✅ FIXED handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // build FormData (when you have file uploads)
    const fd = new FormData();

    // for nested address in backend you might want to append address fields differently;
    // here we append plain keys that match your backend controller

    if (formData.logo) {
      fd.append("logo", formData.logo);
    }
    fd.append("name", formData.name);
    fd.append("ownername", formData.ownerName);
    fd.append("email", formData.email);
    fd.append("password", formData.password);
    fd.append("phone", formData.phone);
    fd.append("state", formData.state);
    fd.append("street", formData.street);
    fd.append("cuisine", formData.cuisine);
    fd.append("isopen", formData.isOpen);
    fd.append("city", formData.city);
    fd.append("postalCode", formData.postalCode);

    // DEBUG: show FormData content (browser can't console.log(fd) directly)
    console.log("----- FormData being sent -----");
    // for (const pair of fd.entries()) {
    //   console.log(pair[0], ":", pair[1]);
    // }
    console.log("-------------------------------");

    try {
      loading;
      // ensure correct URL & endpoint spelling here
      const res = await axios.post(
        "http://localhost:2000/rastaurant/register", // <- confirm this matches your route exactly
        fd,
        {
          headers: { "Content-Type": "multipart/formdata" }, // Axios will set boundary automatically
        }
      );

      // success: full response

      console.log("RESPONSE DATA:", res.data);
      if (res.data.message === "Restaurant added successfully") {
        handleSuccess("register Successful! Redirecting...");
        setTimeout(() => navigate("/reastaurant-login"), 1500);
        // window.location.href = "https://zerodha-cyan-ten.vercel.app/";
      } else {
        handleError(res.data.message || "registration failed");
        navigate("/reastaurant-register");
      }
    } catch (error) {
      // Robust error logging
      console.error("AXIOS ERROR (full):", error);
      console.error("error.toJSON():", error.toJSON ? error.toJSON() : null);

      // server response payload (very important)
      if (error.response) {
        console.error("error.response.status:", error.response.status);
        console.error("error.response.headers:", error.response.headers);
        console.error("error.response.data:", error.response.data);
        // show user-friendly message if available
        alert(
          `Server returned ${error.response.status}: ${
            error.response.data?.message || JSON.stringify(error.response.data)
          }`
        );
      } else {
        // no response (network error)
        console.error("No response received from server:", error.message);
        alert("Network error or server not reachable: " + error.message);
      }
    } finally {
      !loading;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="container p-4 mt-4"
      style={{
        maxWidth: "750px",
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h2 className="text-center fw-bold mb-4">🍽️ Restaurant Registration</h2>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <TextField
              type="text"
              label="Restaurant Name *"
              name="name"
              fullWidth
              required
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <TextField
              type="text"
              label="Owner Name"
              name="ownerName"
              fullWidth
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <TextField
              type="email"
              label="Email"
              name="email"
              fullWidth
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <TextField
              type="text"
              label="Phone"
              name="phone"
              fullWidth
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <TextField
              type="text"
              label="Cuisine"
              name="cuisine"
              fullWidth
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <TextField
              type="password"
              label="Password"
              name="password"
              fullWidth
              onChange={handleChange}
            />
          </div>

          <h5 className="fw-bold mt-3">📍 Address</h5>

          <div className="col-md-6">
            <TextField
              type="text"
              label="Street"
              name="street"
              fullWidth
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <TextField
              type="text"
              label="City"
              name="city"
              fullWidth
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <TextField
              type="text"
              label="State"
              name="state"
              fullWidth
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <TextField
              type="text"
              label="Postal Code"
              name="postalCode"
              fullWidth
              onChange={handleChange}
            />
          </div>

          {/* Logo Upload */}
          <div className="col-md-12">
            <Button fullWidth variant="outlined" component="label">
              Upload Logo
              <input
                type="file"
                hidden
                name="logo"
                accept="image/*"
                onChange={handleChange}
              />
            </Button>
          </div>

          {/* isOpen */}
          <div className="col-md-12">
            <FormControlLabel
              control={
                <Checkbox
                  name="isOpen"
                  checked={formData.isOpen}
                  onChange={handleChange}
                />
              }
              label="Restaurant is Open"
            />
          </div>

          {/* Submit Button with Loading */}
          <motion.div
            whileHover={{ scale: loading ? 1 : 1.03 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            className="col-12"
          >
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              style={{
                padding: "12px",
                fontSize: "18px",
                borderRadius: "10px",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <CircularProgress size={26} sx={{ color: "white" }} />
              ) : (
                "Register Restaurant"
              )}
            </Button>
          </motion.div>
        </div>
      </form>
      <p className="mt-3 text-center text-muted">
        Already have an account?{" "}
        <Link to="/reastaurant-login" className="text-primary fw-semibold">
          Login
        </Link>
      </p>
      <ToastContainer />
    </motion.div>
  );
};

export default RestaurantRegister;
