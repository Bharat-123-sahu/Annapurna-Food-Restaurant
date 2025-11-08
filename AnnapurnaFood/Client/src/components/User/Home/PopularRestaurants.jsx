// PopularRestaurants.jsx
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
//insert the axios  data from apidata base
const restaurants = [
  {
    id: 1,
    name: "Burger Hub",
    cuisine: "Fast Food, Burgers",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1606755962773-0c8f1d1074bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Pizza Mania",
    cuisine: "Italian, Pizza",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1601924582975-7e1d99c0a3c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Spice House",
    cuisine: "Indian, Biryani",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1617196036311-1e1d5d2b31c9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Sweet Treats",
    cuisine: "Desserts, Bakery",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1608198093002-ad4e005484f6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Dragon Bowl",
    cuisine: "Asian, Chinese",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1625944135561-2a7df3bc0a6d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Juice Junction",
    cuisine: "Healthy, Beverages",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
  },
];

const PopularRestaurants = () => {
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
        {restaurants.map((res) => (
          <div key={res.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
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

              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {res.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
                  {res.cuisine}
                </Typography>

                <Rating
                  name="read-only"
                  value={res.rating}
                  precision={0.1}
                  readOnly
                  size="small"
                />
              </CardContent>

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
        ))}
      </div>
    </div>
  );
};

export default PopularRestaurants;
