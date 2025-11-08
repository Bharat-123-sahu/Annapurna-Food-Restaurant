// PopularFood.jsx
import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const foods = [
  {
    id: 1,
    name: "Cheese Burst Pizza",
    description: "Loaded with extra cheese and toppings.",
    price: 299,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1601924582975-7e1d99c0a3c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Chicken Burger",
    description: "Juicy grilled chicken with fresh veggies.",
    price: 199,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1606755962773-0c8f1d1074bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Biryani Bowl",
    description: "Fragrant basmati rice with spicy chicken.",
    price: 249,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Cold Coffee",
    description: "Iced blend with creamy texture.",
    price: 149,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Chocolate Brownie",
    description: "Soft and gooey with rich chocolate taste.",
    price: 99,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1608198093002-ad4e005484f6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Pasta Alfredo",
    description: "Creamy white sauce with herbs.",
    price: 229,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1589307004173-3c952d1b4e9d?auto=format&fit=crop&w=800&q=80",
  },
];

const PopularFood = () => {
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
        {foods.map((food) => (
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
        ))}
      </div>
    </div>
  );
};

export default PopularFood;
