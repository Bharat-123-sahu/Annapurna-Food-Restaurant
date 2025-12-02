// components/user/RestaurantListing/RestaurantDetail.jsx
import React, { useContext, useState, useEffect } from "react";
import {
  Typography,
  Button,
  Rating,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { FoodContext } from "../../../context/Foodcontext";
import { useLocation, useParams } from "react-router-dom";
import AddToCartButton from "../Menu/AddToCartButton";

const RestaurantDetail = () => {
  // ✅ Get restaurant ID from URL
  const { id } = useParams();

  // ✅ Get restaurant data passed from navigate()
  const location = useLocation();
  const restaurant = location.state?.restaurant; // from navigate(`/restaurantdetail/${res._id}`, { state: { restaurant: res } });

  // ✅ Get food data & fetch method from context
  const { fetchFoodByRestaurant, foods, loading } = useContext(FoodContext);

  // ✅ Fetch foods for this restaurant when page loads
  useEffect(() => {
    if (id) {
      fetchFoodByRestaurant(id);
    }
  }, [id]);

  // ✅ Handle no restaurant found
  if (!restaurant) {
    return (
      <div className="text-center text-muted py-5">
        <h5>Restaurant details not available 😞</h5>
      </div>
    );
  }

  return (
    <div className="restaurant-detail-page">
      {/* ✅ Top Banner */}
      <div
        className="restaurant-banner position-relative"
        style={{
          height: "300px",
          backgroundImage: `url(${
            restaurant.image ||
            "https://images.unsplash.com/photo-1613946069412-38f7f1ff0b65?auto=format&fit=crop&w=800&q=80"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderBottom: "4px solid #FF6A00",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.7))",
          }}
        ></div>

        <div className="container h-100 d-flex flex-column justify-content-end pb-4 text-white">
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {restaurant.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "rgba(255,255,255,0.9)" }}
          >
            {restaurant.cuisine}
          </Typography>

          <div className="d-flex align-items-center mt-2 gap-3">
            <Rating
              value={restaurant.rating || 4.5}
              precision={0.1}
              readOnly
              size="small"
            />
            <Typography variant="body2">{restaurant.rating}★</Typography>
            <Typography variant="body2">
              {restaurant.deliveryTime || "30 mins"}
            </Typography>
          </div>
        </div>
      </div>

      {/* ✅ Restaurant Info Section */}
      <div className="container my-5">
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          About {restaurant.name}
        </Typography>
        <Typography variant="body1" sx={{ color: "#555", mb: 4 }}>
          {restaurant.description ||
            "Enjoy delicious meals made with love and fresh ingredients."}
        </Typography>

        {/* ✅ Menu Section */}
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

        {/* ✅ Food Cards */}
        <div className="row g-4">
          {loading ? (
            <h6 className="text-center text-muted my-4">Loading menu...</h6>
          ) : foods.length === 0 ? (
            <h6 className="text-center text-muted my-4">
              No menu items available 😞
            </h6>
          ) : (
            foods.map((item) => (
              <div
                key={item._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <Card
                  className="shadow-sm border-0"
                  sx={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <div style={{ height: "160px", overflow: "hidden" }}>
                    <img
                      src={
                        item.image ||
                        "https://placehold.co/300x200?text=No+Image"
                      }
                      alt={item.name}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                      onError={(e) =>
                        (e.target.src =
                          "https://placehold.co/300x200?text=Image+Error")
                      }
                    />
                  </div>

                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <div className="d-flex justify-content-between align-items-center">
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "#FF6A00", fontWeight: 600 }}
                      >
                        ₹{item.price}
                      </Typography>
                      <Rating
                        value={item.rating || 4.5}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                    </div>
                  </CardContent>

                  <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                    <AddToCartButton
          food={item}
          onAdd={(count) => console.log(`${item?.name} added, count: ${count}`)}
          onRemove={(count) =>
            console.log(`${item?.name} removed, count: ${count}`)
          }
        />
                  </CardActions>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
