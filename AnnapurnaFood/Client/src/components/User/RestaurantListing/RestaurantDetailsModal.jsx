// components/user/RestaurantListing/RestaurantDetail.jsx
import React, { useState } from "react";
import { Typography, Button, Rating, Card, CardContent, CardActions } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';

const RestaurantDetail = () => {
  // Example restaurant data — later you can fetch it from your backend (via ID)
  const restaurant = {
    name: "Spice Villa",
    cuisine: "Indian, Chinese",
    rating: 4.6,
    deliveryTime: "25 mins",
    image: "https://images.unsplash.com/photo-1625944135561-2a7df3bc0a6d?auto=format&fit=crop&w=1000&q=80",
    description:
      "Experience the rich taste of India with our authentic dishes and aromatic spices. Serving you the best of Indian and Chinese fusion with a delightful dining experience.",
  };

  // Example menu data — in a real project, fetched from API
  const [menu] = useState([
    {
      id: 1,
      name: "Butter Chicken",
      price: 299,
      image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Paneer Tikka",
      price: 249,
      image: "https://images.unsplash.com/photo-1605478577068-71bdbdff28c2?auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
    },
    {
      id: 3,
      name: "Veg Hakka Noodles",
      price: 199,
      image: "https://images.unsplash.com/photo-1617196036311-1e1d5d2b31c9?auto=format&fit=crop&w=800&q=80",
      rating: 4.4,
    },
    {
      id: 4,
      name: "Chicken Biryani",
      price: 299,
      image: "https://images.unsplash.com/photo-1632203171959-ecedc858b4b2?auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
    },
  ]);

  return (
    <div className="restaurant-detail-page">
      {/* Top Banner */}
      <div
        className="restaurant-banner position-relative"
        style={{
          height: "300px",
          backgroundImage: `url(${restaurant.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderBottom: "4px solid #FF6A00",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.7))",
          }}
        ></div>

        <div className="container h-100 d-flex flex-column justify-content-end pb-4 text-white">
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {restaurant.name}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.9)" }}>
            {restaurant.cuisine}
          </Typography>

          <div className="d-flex align-items-center mt-2 gap-3">
            <Rating value={restaurant.rating} precision={0.1} readOnly size="small" />
            <Typography variant="body2">{restaurant.rating}★</Typography>
            <Typography variant="body2">{restaurant.deliveryTime}</Typography>
          </div>
        </div>
      </div>

      {/* Restaurant Info Section */}
      <div className="container my-5">
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          About {restaurant.name}
        </Typography>
        <Typography variant="body1" sx={{ color: "#555", mb: 4 }}>
          {restaurant.description}
        </Typography>

        {/* Menu Section */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 3,
            color: "#333",
            borderBottom: "2px solid #FF6A00",
            display: "inline-block",
          }}
        >
          Menu 🍴
        </Typography>

        <div className="row g-4">
          {menu.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <Card
                className="shadow-sm border-0"
                sx={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  '&:hover': {
                    transform: "translateY(-6px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <div style={{ height: "160px", overflow: "hidden" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {item.name}
                  </Typography>
                  <div className="d-flex justify-content-between align-items-center">
                    <Typography variant="subtitle1" sx={{ color: "#FF6A00", fontWeight: 600 }}>
                      ₹{item.price}
                    </Typography>
                    <Rating value={item.rating} precision={0.1} readOnly size="small" />
                  </div>
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
                      textTransform: "none",
                      '&:hover': {
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
    </div>
  );
};

export default RestaurantDetail;
