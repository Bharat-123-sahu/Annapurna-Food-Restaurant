// components/user/Home/PopularRestaurants.jsx
import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomButton from "../../common/Button";
import { useNavigate } from "react-router-dom";
const PopularRestaurants = ({ res }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/restaurantdetail/${res._id}`, { state: { restaurant: res } });
    // console.log("click")
  };
  return (
    <>
      <Card
        className="shadow-sm border-0 restaurant-card"
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          },
        }}
      >
        {/* Restaurant Image */}
        <div style={{ height: "180px", overflow: "hidden" }}>
          <img
            src={`http://localhost:2000/upload/${res.logo}`}
            alt={res.name}
            className="w-100 h-100"
            style={{
              objectFit: "cover",
              transition: "transform 0.4s ease",
            }}
          />
        </div>

        {/* Content */}
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            {res.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
            {res.cuisine || "Various Cuisines"}
          </Typography>

          <Rating
            name="read-only"
            value={res.rating || 4.5}
            precision={0.1}
            readOnly
            size="small"
          />
        </CardContent>

        {/* Button */}
        <CardActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF6A00",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "50px",
              px: 3,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#EE0979",
              },
            }}
            onClick={handleClick}
          >
            Order Now
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default PopularRestaurants;
