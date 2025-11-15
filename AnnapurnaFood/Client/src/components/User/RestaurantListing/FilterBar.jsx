// components/user/RestaurantListing/FilterBar.jsx
// components/user/RestaurantListing/FilterBar.jsx
import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const FilterBar = ({ onFilter }) => {
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [rating, setRating] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Example cuisine options — you can fetch from API too
  const cuisineOptions = [
    "All",
    "Indian",
    "Chinese",
    "Italian",
    "Fast Food",
    "Desserts",
  ];

  // ✅ Send filters to parent (RestaurantListing)
  const handleFilter = () => {
    onFilter({
      search,
      cuisine,
      rating,
      sortBy,
    });
  };

  // ✅ Reset filters
  const handleReset = () => {
    setSearch("");
    setCuisine("");
    setRating("");
    setSortBy("");
    onFilter({
      search: "",
      cuisine: "",
      rating: "",
      sortBy: "",
    });
  };

  return (
    <div className="filter-bar bg-light py-3 px-3 rounded shadow-sm mb-4">
      <div className="container">
        <div className="row g-3 align-items-center">
          {/* Search Bar */}
          <div className="col-12 col-md-3">
            <TextField
              fullWidth
              size="small"
              placeholder="Search restaurant..."
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
            />
          </div>

          {/* Cuisine Filter */}
          <div className="col-6 col-md-3">
            <FormControl
              fullWidth
              size="small"
              sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
            >
              <InputLabel>Cuisine</InputLabel>
              <Select
                value={cuisine}
                label="Cuisine"
                onChange={(e) => setCuisine(e.target.value)}
              >
                {cuisineOptions.map((type) => (
                  <MenuItem key={type} value={type === "All" ? "" : type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* Rating Filter */}
          <div className="col-6 col-md-2">
            <FormControl
              fullWidth
              size="small"
              sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
            >
              <InputLabel>Rating</InputLabel>
              <Select
                value={rating}
                label="Rating"
                onChange={(e) => setRating(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="4">4★ & above</MenuItem>
                <MenuItem value="3">3★ & above</MenuItem>
                <MenuItem value="2">2★ & above</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Sort By */}
          <div className="col-6 col-md-2">
            <FormControl
              fullWidth
              size="small"
              sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
            >
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
                <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
                <MenuItem value="highToLow">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Buttons */}
          <div className="col-12 col-md-2 d-flex gap-2 justify-content-md-end">
            <Button
              variant="contained"
              onClick={handleFilter}
              sx={{
                backgroundColor: "#FF6A00",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#EE0979",
                },
              }}
            >
              Apply
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
              sx={{
                color: "#333",
                borderColor: "#ccc",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;


// import React from "react";
// import FilterBar from "./FilterBar";

// const RestaurantListing = () => {
//   const handleFilter = (filters) => {
//     console.log("Applied Filters:", filters);
//     // You can fetch filtered data from API here
//   };

//   return (
//     <div className="container my-4">
//       <h3 className="mb-3 fw-bold">Restaurants Near You 🍴</h3>
//       <FilterBar onFilter={handleFilter} />
//       {/* Restaurant cards will go here */}
//     </div>
//   );
// };

// export default RestaurantListing;
