// components/user/Auth/AuthForm.jsx
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
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import GoogleIcon from "@mui/icons-material/Google";
import "bootstrap/dist/css/bootstrap.min.css";

const AuthForm = ({ onSubmit }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    // Pass data to parent (backend integration)
    if (onSubmit) onSubmit(formData, isSignup ? "signup" : "login");

    alert(
      isSignup
        ? "Signup successful! 🎉"
        : "Login successful! Welcome back 🍕"
    );
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <Card
        className="shadow-lg border-0"
        sx={{
          width: "100%",
          maxWidth: "450px",
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
              mb: 3,
            }}
          >
            {isSignup ? "Create Account" : "Welcome Back"}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "gray",
              mb: 3,
            }}
          >
            {isSignup
              ? "Sign up to start ordering delicious food 🍔"
              : "Login to continue your food journey 🍕"}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {isSignup && (
                <TextField
                  name="name"
                  label="Full Name"
                  variant="outlined"
                  size="small"
                  value={formData.name}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "#FF6A00" }} />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              )}

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

              <Button
                variant="contained"
                type="submit"
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
                {isSignup ? "Sign Up" : "Login"}
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
                onClick={() => alert("Google Auth Coming Soon ⚙️")}
              >
                Continue with Google
              </Button>
            </Box>
          </form>

          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              mt: 3,
              color: "gray",
            }}
          >
            {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
            <Button
              sx={{
                color: "#FF6A00",
                textTransform: "none",
                fontWeight: 600,
              }}
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
