import react, { useEffect } from "react";
import { FoodContext } from "../../../context/Foodcontext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useContext } from "react";
import PopularFood from "./PopularFoods";
export const Populatfooditem = () => {
  const { foods, popularFoods, loading, fetchAllFoods } =
    useContext(FoodContext);

  useEffect(() => {
    fetchAllFoods();
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
  if (!foods || foods.length === 0)
    return (
      <h5 className="text-center text-muted my-5">
        No food items available 😞
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
        Popular Dishes 🍕
      </Typography>

      <div className="row g-4">
        {!popularFoods ? (
          <Typography>Sorry we have np popular foods</Typography>
        ) : (
          foods.map((fooddata) => (
            <div
              key={fooddata._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <PopularFood food={fooddata} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
