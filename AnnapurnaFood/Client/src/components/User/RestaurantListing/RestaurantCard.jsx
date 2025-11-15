// components/user/RestaurantListing/RestaurantCards.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios"; // ✅ Don't forget this import
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Rating,
  Button,
  Box,
} from "@mui/material";

import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const RestaurantCards = ({ res }) => {
 
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurantdetail/${res._id}`, { state: { restaurant: res } });
    // console.log("click")
  };
  
  return (
    <Card
      className="shadow-sm border-0 restaurant-card"
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Box sx={{ height: 180, overflow: "hidden" }}>
        <img
          src={
            res?.image ||
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600"
          }
          alt={res?.name}
          className="w-100 h-100"
          style={{
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
        />
      </Box>

      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
          {res?.name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "gray",
            mb: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {res?.cuisine || "Various Cuisines"}
        </Typography>

        <div className="d-flex justify-content-between align-items-center">
          <Rating
            name="read-only"
            value={res?.rating || 4}
            precision={0.1}
            readOnly
            size="small"
          />
          <Typography
            variant="caption"
            sx={{
              fontWeight: 500,
              color: "#FF6A00",
            }}
          >
            {res.deliveryTime || "30 mins"}
          </Typography>
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
            "&:hover": {
              backgroundColor: "#EE0979",
            },
          }}
          onClick={handleClick}
        >
          Detail
        </Button>
      </CardActions>
    </Card>
  );
};

export default RestaurantCards;

// import React, { useState } from "react";
// import FilterBar from "./FilterBar";
// import RestaurantCards from "./RestaurantCards";

// const RestaurantListing = () => {
//   const [filteredRestaurants, setFilteredRestaurants] = useState([
//     {
//       name: "Spice Villa",
//       cuisine: "Indian, Chinese",
//       rating: 4.6,
//       deliveryTime: "25 mins",
//       image: "https://images.unsplash.com/photo-1625944135561-2a7df3bc0a6d?auto=format&fit=crop&w=800&q=80",
//     },
//     {
//       name: "Pizza Empire",
//       cuisine: "Italian, Pizza",
//       rating: 4.4,
//       deliveryTime: "30 mins",
//       image: "https://images.unsplash.com/photo-1601924582975-7e1d99c0a3c4?auto=format&fit=crop&w=800&q=80",
//     },
//     {
//       name: "Burger Factory",
//       cuisine: "Fast Food, Burgers",
//       rating: 4.3,
//       deliveryTime: "20 mins",
//       image: "https://images.unsplash.com/photo-1606755962773-0c8f1d1074bc?auto=format&fit=crop&w=800&q=80",
//     },
//     {
//       name: "Sweet Sensation",
//       cuisine: "Desserts, Beverages",
//       rating: 4.8,
//       deliveryTime: "35 mins",
//       image: "https://images.unsplash.com/photo-1608198093002-ad4e005484f6?auto=format&fit=crop&w=800&q=80",
//     },
//   ]);

//   const handleFilter = (filters) => {
//     console.log("Filters:", filters);
//     // You can apply filter logic here
//   };

//   return (
//     <div className="container my-4">
//       <h3 className="fw-bold mb-3">Explore Restaurants Near You 🍴</h3>
//       <FilterBar onFilter={handleFilter} />
//       <RestaurantCards restaurants={filteredRestaurants} />
//     </div>
//   );
// };

// export default RestaurantListing;
