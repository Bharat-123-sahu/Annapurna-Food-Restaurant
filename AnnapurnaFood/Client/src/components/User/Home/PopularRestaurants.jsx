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
import axios from "axios";

import { RestaurantContext } from "../../../context/restaurantdata";
const PopularRestaurants = () => {
  const { restaurants, popular, loading } = useContext(RestaurantContext);

  return (
    <div className="container py-5">
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: 4,
          color: "#333",
        }}
      >
        Popular Restaurants 🍴
      </Typography>

      <div className="row g-4">
        {loading ? (
          <Typography textAlign="center">Loading foods...</Typography>
        ) : popular ? (
          restaurants.length > 0 ? (
            restaurants.map((res, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
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
                      src={res.image}
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
                        "&:hover": {
                          backgroundColor: "#EE0979",
                        },
                      }}
                    >
                      Order Now
                    </Button>
                  </CardActions>
                </Card>
              </div>
            ))
          ) : (
            <Typography
              variant="body1"
              className="text-center py-5"
              sx={{ color: "gray" }}
            >
              🍽️ No restaurants found.
            </Typography>
          )
        ) : (
          <Typography textAlign="center" sx={{ mt: 3 }}>
            Enter a category name to search foods 🔍
          </Typography>
        )}
      </div>
    </div>
  );
};

export default PopularRestaurants;
