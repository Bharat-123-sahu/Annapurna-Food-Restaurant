import RestaurantCards from "./RestaurantCard";
import { RestaurantContext } from "../../../context/restaurantdata";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import React, { useContext,useState, useEffect } from "react";
import FilterBar from "./FilterBar";

export const Restaurenadatamap = () => {
  const { restaurants, loading, fetchRestaurants } =
  useContext(RestaurantContext);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  useEffect(() => {
    fetchRestaurants();
  }, []);

  // ✅ Fetch all restaurants when component mounts
 

  // ✅ Whenever restaurants are fetched, set them in filtered list
  useEffect(() => {
    setFilteredRestaurants(restaurants);
  }, [restaurants]);

  // ✅ Handle filters received from FilterBar
  const handleFilter = (filters) => {
    let filtered = [...restaurants];
    const { search, cuisine, rating, sortBy } = filters;

    // 🔍 Search by restaurant name
    if (search) {
      filtered = filtered.filter((res) =>
        res.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🍜 Filter by cuisine
    if (cuisine) {
      filtered = filtered.filter(
        (res) => res.cuisine?.toLowerCase() === cuisine.toLowerCase()
      );
    }

    // ⭐ Filter by rating
    if (rating) {
      filtered = filtered.filter((res) => res.rating >= Number(rating));
    }

    // 💸 Sort by price or rating
    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "lowToHigh") {
      filtered.sort((a, b) => a.avgPrice - b.avgPrice);
    } else if (sortBy === "highToLow") {
      filtered.sort((a, b) => b.avgPrice - a.avgPrice);
    }

    setFilteredRestaurants(filtered);
  };

  // ✅ Loader while fetching
  if (loading)
    return (
      <Box
        className="d-flex justify-content-center align-items-center"
        sx={{ height: "50vh" }}
      >
        <CircularProgress sx={{ color: "#FF6A00" }} />
      </Box>
    );


  if (loading)
    return (
      <Box
        className="d-flex justify-content-center align-items-center"
        sx={{ height: "50vh" }}
      >
        <CircularProgress sx={{ color: "#FF6A00" }} />
      </Box>
    );
    if (!restaurants || restaurants.length === 0)
      return (
    <h5 className="text-center text-muted my-5">
        No restaurants items available 😞
      </h5>
    );
    return (
      <div className="container my-5">
      <h3 className="fw-bold mb-4 text-center">Our Restaurat 🍝</h3>
        <FilterBar onFilter={handleFilter} />

      <div className="row g-4">
       {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((res) => (
            <div key={res._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <RestaurantCards res={res} />
            </div>
          ))
        ) : (
          <h6 className="text-center text-muted my-5">
            No matching restaurants found 😞
          </h6>
        )}
      </div>
    </div>
  );
};
