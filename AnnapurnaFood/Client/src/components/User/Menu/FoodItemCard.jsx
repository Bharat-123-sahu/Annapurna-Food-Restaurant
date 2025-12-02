// components/user/Menu/FoodItemsCard.jsx
// src/components/user/Menu/FoodItemsCard.jsx
import React from "react";
import { Card, CardContent, Typography, Rating } from "@mui/material";
import AddToCartButton from "./AddToCartButton";
import "bootstrap/dist/css/bootstrap.min.css";

const FoodItemsCard = ({ food }) => {
  //
  if (!food) {
    return (
      <div className="text-center text-muted py-3">
        <p>Food item not available.</p>
      </div>
    );
  }

  return (
    <Card
      className="shadow-sm border-0 food-card"
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
      {/* ✅ Image Section with Fallback */}
      <div style={{ height: "160px", overflow: "hidden" }}>
        <img
          src={`http://localhost:2000/upload/${food.image}`}
          alt={food?.name || "Food"}
          className="w-100 h-100"
          style={{
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600";
          }}
        />
      </div>

      {/* ✅ Content Section */}
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
          {food?.name || "Unknown Dish"}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "gray",
            mb: 1,
            minHeight: "40px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {food?.description || "Delicious and freshly prepared."}
        </Typography>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <Typography
            variant="subtitle1"
            sx={{ color: "#FF6A00", fontWeight: 600 }}
          >
            ₹{food?.price ?? "N/A"}
          </Typography>

          <Rating
            value={food?.rating || 4.5}
            precision={0.1}
            readOnly
            size="small"
          />
        </div>

        {/* ✅ Add To Cart Button */}
        <AddToCartButton
          food={food}
          onAdd={(count) => console.log(`${food?.name} added, count: ${count}`)}
          onRemove={(count) =>
            console.log(`${food?.name} removed, count: ${count}`)
          }
        />
      </CardContent>
    </Card>
  );
};

export default FoodItemsCard;

// import React from "react";
// import FoodItemsCard from "./FoodItemsCard";

// const MenuSection = () => {
//   const foodItems = [
//     {
//       id: 1,
//       name: "Margherita Pizza",
//       description: "Classic cheese pizza with tomato base.",
//       price: 249,
//       rating: 4.7,
//       image:
//         "https://images.unsplash.com/photo-1601924582975-7e1d99c0a3c4?auto=format&fit=crop&w=800&q=80",
//     },
//     {
//       id: 2,
//       name: "Chicken Burger",
//       description: "Grilled chicken with lettuce & mayo.",
//       price: 199,
//       rating: 4.5,
//       image:
//         "https://images.unsplash.com/photo-1606755962773-0c8f1d1074bc?auto=format&fit=crop&w=800&q=80",
//     },
//     {
//       id: 3,
//       name: "Pasta Alfredo",
//       description: "Creamy white sauce pasta with herbs.",
//       price: 229,
//       rating: 4.6,
//       image:
//         "https://images.unsplash.com/photo-1589307004173-3c952d1b4e9d?auto=format&fit=crop&w=800&q=80",
//     },
//   ];

//   return (
//     <div className="container my-5">
//       <h3 className="fw-bold mb-4 text-center">Our Special Dishes 🍝</h3>

//       <div className="row g-4">
//         {foodItems.map((item) => (
//           <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
//             <FoodItemsCard food={item} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MenuSection;
