// CategoryList.jsx
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const categories = [
  {
    id: 1,
    name: "Pizza",
    image: "https://cdn-icons-png.flaticon.com/512/3595/3595455.png",
  },
  {
    id: 2,
    name: "Burger",
    image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
  },
  {
    id: 3,
    name: "Drinks",
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
  },
  {
    id: 4,
    name: "Dessert",
    image: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png",
  },
  {
    id: 5,
    name: "Biryani",
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046769.png",
  },
  {
    id: 6,
    name: "Chinese",
    image: "https://cdn-icons-png.flaticon.com/512/3364/3364006.png",
  },
];

const CategoryList = () => {
  return (
    <Box className="container py-5">
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: 4,
          color: "#333",
        }}
      >
        Explore Food Categories 🍽️
      </Typography>

      <div className="row g-4 justify-content-center">
        {categories.map((cat) => (
          <div key={cat.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
            <Card
              className="text-center p-3 shadow-sm border-0 category-card"
              sx={{
                borderRadius: "20px",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                },
              }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="img-fluid mx-auto mb-2"
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "contain",
                }}
              />
              <CardContent sx={{ p: 0 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: "#444",
                  }}
                >
                  {cat.name}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default CategoryList;
