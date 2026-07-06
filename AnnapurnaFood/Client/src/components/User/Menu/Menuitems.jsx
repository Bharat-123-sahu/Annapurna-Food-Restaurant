// src/components/user/Menu/MenuSection.jsx
import React, { useContext, useEffect } from "react";
import { FoodContext } from "../../../context/Foodcontext";
import FoodItemsCard from "./FoodItemCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
// const foods = [
//   { _id: 1, name: "Pizza", price: 250, image: "https://images.unsplash.com/photo-1761839257664-ecba169506c1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600" },
//   { _id: 2, name: "Burger", price: 180, image: "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600" },
// ];
const MenuSection = () => {
  // ✅ Access context values
  const { loading, foods, fetchAllFoods } = useContext(FoodContext);

  // // ✅ Fetch all foods on mount
  useEffect(() => {
    fetchAllFoods(); // fetch only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Loader
  if (loading)
    return (
      <Box
        className="d-flex justify-content-center align-items-center"
        sx={{ height: "50vh" }}
      >
        <CircularProgress sx={{ color: "#FF6A00" }} />
      </Box>
    );

  // ✅ Empty state
  if (!foods || foods.length === 0)
    return (
      <h5 className="text-center text-muted my-5">
        No food items available 😞
      </h5>
    );

  // ✅ Render all foods
  return (
    <div className="container my-5">
      <h3 className="fw-bold mb-4 text-center">Our Special Dishes 🍝</h3>

      <div className="row g-4">
        {foods.map((fooddata) => (
          <div key={fooddata._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <FoodItemsCard food={fooddata} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
