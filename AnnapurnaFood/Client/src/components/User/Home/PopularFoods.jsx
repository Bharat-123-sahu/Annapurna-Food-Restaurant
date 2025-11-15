// PopularFood.jsx
import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

import { FoodContext } from "../../../context/Foodcontext";


const PopularFood = () => {
  
  const {foods,popularFoods,loading}= useContext(FoodContext)
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
        Popular Dishes 🍕
      </Typography>

      <div className="row g-4">
{loading? (<Typography textAlign="center">Loading foods...</Typography>):
popularFoods?(foods.length>0?(foods.map((food) => 
  (
          <div key={food.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Card
              className="shadow-sm border-0 food-card"
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                },
              }}
            >
              {/* Image Section */}
              <div style={{ height: "180px", overflow: "hidden" }}>
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-100 h-100"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                />
              </div>

              {/* Content */}
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {food.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "gray", mb: 1, minHeight: "40px" }}
                >
                  {food.description}
                </Typography>

                <div className="d-flex justify-content-between align-items-center">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: "#FF6A00" }}
                  >
                    ₹{food.price}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={food.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                </div>
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
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </div>
        )) ) :(<Typography textAlign="center" sx={{ mt: 3 }}>
                      No foods found for "{popularFoods}" 😞
                    </Typography>) ):(<Typography textAlign="center" sx={{ mt: 3 }}>
                                Enter a category name to search foods 🔍
                              </Typography>)
        }
      </div>
    </div>
  );
};

export default PopularFood;
