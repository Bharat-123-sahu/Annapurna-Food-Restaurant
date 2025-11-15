import React from "react";
import Navbar from "../../components/common/Navbar";
import RestaurantDetail from "../../components/User/RestaurantListing/RestaurantDetailsModal";
import FoodItemsCard from "../../components/User/Menu/FoodItemCard";
import AddToCartButton from "../../components/User/Menu/AddToCartButton";
import Footer from "../../components/common/Footer";

export const RestaurantDetails = () => {
  return (
    <>
      <Navbar />
      <RestaurantDetail />
      {/* <FoodItemsCard /> */}

      <Footer />
    </>
  );
};
