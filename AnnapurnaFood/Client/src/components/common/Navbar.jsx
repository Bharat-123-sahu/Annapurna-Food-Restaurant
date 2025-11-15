// components/User/Layout/Navbar.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Button,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(90deg, #FF6A00, #EE0979)",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar
          className="container d-flex justify-content-between align-items-center"
          sx={{ py: 1 }}
        >
          {/* 🍴 Brand */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            🍴 FoodieApp
          </Typography>

          {/* 🖥️ Desktop Menu */}
          <Box className="d-none d-md-flex align-items-center gap-3">
            <Link className="nav-link text-white" to="/">
              Home
            </Link>

            <Link className="nav-link text-white" to="/restaurant">
              Restaurants
            </Link>

            <Link className="nav-link text-white" to="/menu">
              Menu
            </Link>

            <Link className="nav-link text-white" to="/order">
              Orders
            </Link>

            <Link className="nav-link text-white" to="/cart">
              <IconButton color="inherit">
                <Badge badgeContent={3} color="error">
                  <ShoppingCartIcon sx={{ color: "#fff" }} />
                </Badge>
              </IconButton>
            </Link>

            <IconButton color="inherit" onClick={handleProfileMenuOpen}>
              <AccountCircle sx={{ color: "#fff" }} />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  borderRadius: "10px",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                },
              }}
            >
              <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => alert("🔒 Logged out!")}>Logout</MenuItem>
            </Menu>

            <Link className="nav-link text-white" to="/login">
              Login
            </Link>

            <Link className="nav-link text-white" to="/signup">
              Signup
            </Link>
          </Box>

          {/* 📱 Mobile Hamburger */}
          <div className="d-md-none">
            <IconButton color="inherit" onClick={() => setMobileOpen(!mobileOpen)}>
              <MenuIcon sx={{ color: "#fff" }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* 📱 Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-primary text-white d-md-none"
            style={{
              background: "linear-gradient(90deg, #FF6A00, #EE0979)",
              overflow: "hidden",
            }}
          >
            <Box className="container py-2">
              <Button
                component={Link}
                to="/"
                fullWidth
                color="inherit"
                onClick={() => setMobileOpen(false)}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1,
                  color: "#fff",
                }}
              >
                Home
              </Button>

              <Button
                component={Link}
                to="/restaurant"
                fullWidth
                color="inherit"
                onClick={() => setMobileOpen(false)}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1,
                  color: "#fff",
                }}
              >
                Restaurants
              </Button>

              <Button
                component={Link}
                to="/menu"
                fullWidth
                color="inherit"
                onClick={() => setMobileOpen(false)}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1,
                  color: "#fff",
                }}
              >
                Menu
              </Button>

              <Button
                component={Link}
                to="/order"
                fullWidth
                color="inherit"
                onClick={() => setMobileOpen(false)}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1,
                  color: "#fff",
                }}
              >
                Orders
              </Button>

              <Button
                component={Link}
                to="/cart"
                fullWidth
                color="inherit"
                onClick={() => setMobileOpen(false)}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1,
                  color: "#fff",
                }}
              >
                <ShoppingCartIcon sx={{ mr: 1 }} /> Cart (3)
              </Button>

              <Button
                component={Link}
                to="/profile"
                fullWidth
                color="inherit"
                onClick={() => setMobileOpen(false)}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1,
                  color: "#fff",
                }}
              >
                <AccountCircle sx={{ mr: 1 }} /> Profile
              </Button>

              <Button
                component={Link}
                to="/login"
                fullWidth
                color="inherit"
                onClick={() => setMobileOpen(false)}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1,
                  color: "#fff",
                }}
              >
                Login
              </Button>

              <Button
                component={Link}
                to="/signup"
                fullWidth
                color="inherit"
                onClick={() => setMobileOpen(false)}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1,
                  color: "#fff",
                }}
              >
                Signup
              </Button>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
