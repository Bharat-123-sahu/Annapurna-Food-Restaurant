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

// import { FoodContext } from "../../../context/Foodcontext";
import AddToCartButton from "../Menu/AddToCartButton";

const PopularFood = ({ food }) => {
  return (
    <>
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
            src={`http://localhost:2000/upload/${food.image}`}
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
          <AddToCartButton
            food={food}
            onAdd={(count) =>
              console.log(`${food?.name} added, count: ${count}`)
            }
            onRemove={(count) =>
              console.log(`${food?.name} removed, count: ${count}`)
            }
          />
        </CardActions>
      </Card>
    </>
  );
};

export default PopularFood;
