// Footer.jsx
import React from "react";
import { Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  const quickLinks = ["Home", "Restaurants", "Menu", "Orders", "Contact"];
  const customerService = ["FAQ", "Support", "Terms", "Privacy"];

  return (
    <footer className="bg-dark text-white pt-5 pb-3 ">
      <div className="container">
        <div className="row">
          {/* Brand & About */}
          <div className="col-12 col-md-3 mb-4">
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              FoodieApp
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Delivering happiness to your doorstep with fresh and delicious
              meals.
            </Typography>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-3 mb-4">
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Links
            </Typography>
            <ul className="list-unstyled">
              {quickLinks.map((link) => (
                <li key={link} className="mb-1">
                  <a href="#" className="text-white text-decoration-none">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-6 col-md-3 mb-4">
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Customer Service
            </Typography>
            <ul className="list-unstyled">
              {customerService.map((link) => (
                <li key={link} className="mb-1">
                  <a href="#" className="text-white text-decoration-none">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-12 col-md-3 mb-4">
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Follow Us
            </Typography>
            <div className="d-flex">
              <IconButton color="inherit" href="#">
                <FacebookIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton color="inherit" href="#">
                <TwitterIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton color="inherit" href="#">
                <InstagramIcon sx={{ color: "white" }} />
              </IconButton>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-4 pt-3 border-top border-secondary">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} FoodieApp. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
