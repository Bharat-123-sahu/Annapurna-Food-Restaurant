// NewsLetters.jsx//working on nodemailer ungently
import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const NewsLetters = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email.trim() === "") {
      alert("Please enter your email address.");
    } else {
      alert(`Subscribed successfully with: ${email}`);
      setEmail("");
    }
  };

  return (
    <div
      className="newsletter-section py-5"
      style={{
        background: "linear-gradient(135deg, #EE0979 0%, #FF6A00 100%)",
        color: "#fff",
      }}
    >
      <div className="container text-center">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 2,
            textShadow: "2px 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          Subscribe to Our Newsletter ✉️
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            mb: 4,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          Get exclusive offers, new restaurant updates, and special discounts
          directly to your inbox!
        </Typography>

        {/* Input + Button Section */}
        <div className="row justify-content-center">
          <div className="col-10 col-md-8 col-lg-6">
            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3">
              <TextField
                fullWidth
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "50px",
                  input: {
                    borderRadius: "50px",
                    px: 2,
                  },
                  "& fieldset": {
                    border: "none",
                  },
                  flexGrow: 1,
                }}
              />
              <Button
                variant="contained"
                size="large"
                onClick={handleSubscribe}
                sx={{
                  borderRadius: "50px",
                  backgroundColor: "#FF6A00",
                  color: "#fff",
                  fontWeight: 600,
                  px: 4,
                  py: 1.2,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#EE0979",
                  },
                }}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetters;
