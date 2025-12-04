import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import QuantitySelector from "../Menu/QuantitySelector";

const CartItemCard = ({ item, onQuantityChange, onRemove }) => {
  const food = item.food; // safer + clean
  // console.log("DELETE CLICKED ID:", item._id);

  return (
    <div className="row g-4">
      <Card
        className="shadow-sm border-0 mb-3"
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          },
        }}
      >
        <div className="row g-0 align-items-center">
          {/* Image */}
          <div className="col-4 col-md-3">
            <img
              src={`http://localhost:2000/upload/${food.image}`}
              alt={food?.name}
              className="w-100 h-100"
              style={{
                objectFit: "cover",
                height: "130px",
                borderRadius: "16px 0 0 16px",
              }}
            />
          </div>

          {/* Content */}
          <div className="col-8 col-md-9">
            <CardContent>
              <div className="d-flex justify-content-between align-items-start">
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {food?.name}
                </Typography>

                {/* Delete Button */}
                <IconButton
                  onClick={() => onRemove(item._id)} // cart item ID!
                  sx={{
                    color: "#EE0979",
                    "&:hover": { backgroundColor: "rgba(238,9,121,0.1)" },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>

              <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
                Delicious meal
              </Typography>

              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="d-flex align-items-center gap-2">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: "#FF6A00" }}
                  >
                    ₹{item.price}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    × {item.quantity}
                  </Typography>
                </div>

                {/* Quantity Selector */}
                <QuantitySelector
                  quantity={item.quantity}
                  min={1}
                  max={10}
                  onChange={(value) => onQuantityChange(item._id, value)} // cart item ID
                />
              </div>

              <Divider sx={{ my: 1 }} />

              {/* Subtotal */}
              <div className="d-flex justify-content-between align-items-center">
                <Typography variant="body2" sx={{ color: "gray" }}>
                  Subtotal:
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: "#333" }}
                >
                  ₹{(item.price * item.quantity).toFixed(2)}
                </Typography>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CartItemCard;
