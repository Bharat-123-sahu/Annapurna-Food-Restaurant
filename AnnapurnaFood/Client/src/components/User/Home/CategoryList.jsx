// src/components/CategoryList.jsx
import React, { useContext, useState } from "react";
import { Card, CardContent, Typography, Box, TextField, Button } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { FoodContext } from "../../../context/Foodcontext";

const CategoryList = () => {
  const { fetchFoodByCategory, foods, loading } = useContext(FoodContext);

  const [searchCategory, setSearchCategory] = useState(""); // category input
  const [selectedCategory, setSelectedCategory] = useState(""); //  currently fetched

  // ✅ Handle search
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchCategory.trim()) return; // empty field protection

    setSelectedCategory(searchCategory);
    await fetchFoodByCategory(searchCategory.trim());
  };

  return (
    <Box className="container py-5">
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: 4,
          color: "#333",
        }}
      >
        Search Food by Category 🍽️
      </Typography>

      {/* Search Bar */}
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 4,
          gap: 2,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Enter category (e.g. Pizza, Burger, Drinks)"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          sx={{ width: "60%", backgroundColor: "white", borderRadius: "10px" }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#ff7043",
            fontWeight: 600,
            "&:hover": { backgroundColor: "#ff5722" },
          }}
        >
          Search
        </Button>
      </Box>

      {/* Foods Section */}
      <Box sx={{ mt: 5 }}>
        {loading ? (
          <Typography textAlign="center">Loading foods...</Typography>
        ) : selectedCategory ? (
          foods.length > 0 ? (
            <>
              <Typography
                variant="h5"
                textAlign="center"
                sx={{ mb: 3, mt: 4, fontWeight: 600 }}
              >
                Foods in "{selectedCategory}" 🍕
              </Typography>
              <div className="row g-4 justify-content-center">
                {foods.map((food) => (
                  <div key={food._id} className="col-6 col-sm-4 col-md-3">
                    <Card
                      className="text-center p-3 shadow-sm border-0"
                      sx={{
                        borderRadius: "20px",
                        transition:
                          "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-6px)",
                          boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                        },
                      }}
                    >
                      <img
                        src={food.image}
                        alt={food.name}
                        className="img-fluid mx-auto mb-2"
                        style={{
                          width: "90px",
                          height: "90px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                      <CardContent sx={{ p: 0 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {food.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "gray" }}>
                          ₹{food.price}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Typography textAlign="center" sx={{ mt: 3 }}>
              No foods found for "{selectedCategory}" 😞
            </Typography>
          )
        ) : (
          <Typography textAlign="center" sx={{ mt: 3 }}>
            Enter a category name to search foods 🔍
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CategoryList;
