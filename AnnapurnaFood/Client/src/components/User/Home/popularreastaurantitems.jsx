import react, { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useContext } from "react";
import { RestaurantContext } from "../../../context/restaurantdata";
import PopularRestaurants from "./PopularRestaurants";

export const PopulatRestaurantsItem = () => {
  const { restaurants, popular, loading, fetchRestaurants } =
    useContext(RestaurantContext);

  useEffect(() => {
    fetchRestaurants();
  }, []);
   
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
    <div className="container py-5 ">
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: 4,
          color: "#333",
        }}
      >
        Popular Restaurants 🍕
      </Typography>

      <div className="row g-4">
        {!popular ? (
          <Typography>Sorry we have np popular foods</Typography>
        ) : (
          restaurants.map((resdata) => (
            <div
              key={resdata._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <PopularRestaurants res={resdata} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
