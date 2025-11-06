// Navbar.jsx
import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = ["Home", "Restaurants", "Menu", "Orders"];

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar className="container d-flex justify-content-between">
        {/* Brand */}
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          FoodieApp
        </Typography>

        {/* Desktop Links */}
        <div className="d-none d-md-flex align-items-center">
          {links.map((link) => (
            <Button
              key={link}
              color="inherit"
              sx={{
                mx: 1,
                fontWeight: 500,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
              }}
            >
              {link}
            </Button>
          ))}

          {/* Cart Icon */}
          <IconButton color="inherit" sx={{ mx: 1 }}>
            <Badge badgeContent={3} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Profile Icon */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleProfileMenuOpen}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </div>

        {/* Mobile Hamburger */}
        <div className="d-md-none">
          <IconButton color="inherit" onClick={() => setMobileOpen(!mobileOpen)}>
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="d-md-none bg-primary text-white px-3 pb-3">
          {links.map((link) => (
            <Button
              key={link}
              fullWidth
              color="inherit"
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                my: 0.5,
                fontWeight: 500,
              }}
            >
              {link}
            </Button>
          ))}
          <Button fullWidth color="inherit" sx={{ justifyContent: "flex-start", my: 0.5 }}>
            Cart (3)
          </Button>
          <Button fullWidth color="inherit" sx={{ justifyContent: "flex-start", my: 0.5 }}>
            Profile
          </Button>
        </div>
      )}
    </AppBar>
  );
};

export default Navbar;
