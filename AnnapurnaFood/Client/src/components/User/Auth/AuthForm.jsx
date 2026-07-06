// components/user/Auth/AuthForm.jsx
// components/User/Auth/AuthForm.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Divider,
  Box,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import PinDropIcon from "@mui/icons-material/PinDrop";
import CityIcon from "@mui/icons-material/LocationCity";
import FlagIcon from "@mui/icons-material/Flag";
import GoogleIcon from "@mui/icons-material/Google";
import "bootstrap/dist/css/bootstrap.min.css";

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonclick, setButtonclick] = useState(false);
  const navigate = useNavigate();

  // ✅ Full user schema fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    confirmPassword: "",
    address: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        // Validation
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match ❌");
          setLoading(false);
          return;
        }

        const { data } = await axios.post(
          "http://localhost:2000/user/register",
          formData
        );
        alert(data.message || "✅ Account created successfully!");
        navigate("/");
      } else {
        const { data } = await axios.post(
          "http://localhost:2000/user/login",
          formData
        );
        if (data.token) {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("isAuthenticate", "true");
          alert(data.message || "✅ Login successful!");
          navigate("/"); // navigate("/user/dashboard");
        } else {
          console.error("No token found in login response");
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };
  const handleotp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);
    navigate("/forgetpassword");
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <Card
        className="shadow-lg border-0"
        sx={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.8)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#FF6A00",
              textAlign: "center",
              mb: 2,
            }}
          >
            {isSignup ? "Create Account" : "Welcome Back"}
          </Typography>

          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "gray", mb: 3 }}
          >
            {isSignup
              ? "Sign up to enjoy amazing food deliveries 🍔"
              : "Login to continue your food journey 🍕"}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {isSignup && (
                <>
                  <TextField
                    name="name"
                    label="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: "#FF6A00" }} />
                        </InputAdornment>
                      ),
                    }}
                    required
                  />

                  <TextField
                    name="phone"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    size="small"
                    type="tel"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon sx={{ color: "#FF6A00" }} />
                        </InputAdornment>
                      ),
                    }}
                    required
                  />

                  {/* Address Fields */}
                  <TextField
                    name="address"
                    label="Street Address"
                    value={formData.address}
                    onChange={handleChange}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeIcon sx={{ color: "#FF6A00" }} />
                        </InputAdornment>
                      ),
                    }}
                    required
                  />

                  {/* <TextField
                    name="city"
                    label="City"
                    value={formData.city}
                    onChange={handleChange}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CityIcon sx={{ color: "#FF6A00" }} />
                        </InputAdornment>
                      ),
                    }}
                    required
                  /> */}

                  {/* <TextField
                    name="state"
                    label="State"
                    value={formData.state}
                    onChange={handleChange}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FlagIcon sx={{ color: "#FF6A00" }} />
                        </InputAdornment>
                      ),
                    }}
                    required
                  /> */}

                  {/* <TextField
                    name="postalCode"
                    label="Postal Code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    size="small"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PinDropIcon sx={{ color: "#FF6A00" }} />
                        </InputAdornment>
                      ),
                    }}
                    required
                  /> */}

                  {/* <TextField
                    name="country"
                    label="Country"
                    select
                    value={formData.country}
                    onChange={handleChange}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FlagIcon sx={{ color: "#FF6A00" }} />
                        </InputAdornment>
                      ),
                    }}
                    required
                  >
                    <MenuItem value="India">India</MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                    <MenuItem value="UK">UK</MenuItem>
                    <MenuItem value="Canada">Canada</MenuItem>
                  </TextField> */}
                </>
              )}

              {/* Common Email + Password Fields */}
              <TextField
                name="email"
                label="Email Address"
                variant="outlined"
                size="small"
                type="email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "#FF6A00" }} />
                    </InputAdornment>
                  ),
                }}
                required
              />

              <TextField
                name="password"
                label="Password"
                variant="outlined"
                size="small"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#FF6A00" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />

              {isSignup && (
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  size="small"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "#FF6A00" }} />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              )}

              {/* Submit */}
              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{
                  backgroundColor: "#FF6A00",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: "50px",
                  py: 1.2,
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#EE0979" },
                }}
              >
                {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
              </Button>

              <Divider sx={{ my: 2 }}>OR</Divider>

              <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                fullWidth
                sx={{
                  borderRadius: "50px",
                  textTransform: "none",
                  fontWeight: 600,
                  color: "#555",
                  borderColor: "#ddd",
                  "&:hover": { backgroundColor: "rgba(255,106,0,0.08)" },
                }}
                onClick={() => alert("Google Login Coming Soon ⚙️")}
              >
                Continue with Google
              </Button>
            </Box>
          </form>
          {!buttonclick ? (
            <Typography
              variant="body2"
              sx={{ textAlign: "center", mt: 3, color: "gray" }}
            >
              {isSignup ? null : (
                <Button onClick={handleotp}>Forget password</Button>
              )}
            </Typography>
          ) : null}

          <Typography
            variant="body2"
            sx={{ textAlign: "center", mt: 3, color: "gray" }}
          >
            {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
            <Button
              sx={{ color: "#FF6A00", textTransform: "none", fontWeight: 600 }}
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? "Login" : "Sign Up"}
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;

// import React from "react";
// import AuthForm from "./AuthForm";
// import Navbar from "../../Navbar";
// import Footer from "../../Footer";

// const AuthPage = () => {
//   const handleAuthSubmit = (data, type) => {
//     console.log("Auth Data:", data, "Type:", type);
//     // Here you’ll call your backend API (Node/Express)
//   };

//   return (
//     <>
//       <Navbar />
//       <AuthForm onSubmit={handleAuthSubmit} />
//       <Footer />
//     </>
//   );
// };

// export default AuthPage;
