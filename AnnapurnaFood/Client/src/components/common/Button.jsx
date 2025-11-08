// ResponsiveButton.jsx
import React from "react";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomButton = ({
  text = "click",
  color = "primary",
  variant = "contained",
  size = "medium",
  onClick,
  fullWidth = false,
  responsive = true, // for Bootstrap responsiveness
}) => {
  return (
    <Button
      color={color}
      variant={variant}
      size={size}
      onClick={onClick}
      className={responsive ? "btn-responsive" : ""}
      fullWidth={fullWidth}
      sx={{
        borderRadius: "12px",
        textTransform: "capitalize",
        fontWeight: 600,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 6px 14px rgba(0,0,0,0.2)",
        },
        // Use Bootstrap responsive utilities
        "@media (max-width: 576px)": {
          fontSize: "0.8rem",
          padding: "6px 12px",
        },
        "@media (min-width: 577px) and (max-width: 768px)": {
          fontSize: "0.9rem",
          padding: "8px 16px",
        },
        "@media (min-width: 769px)": {
          fontSize: "1rem",
          padding: "10px 20px",
        },
      }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;

//for use this
// <Button
//   text="Click Me"
//   color="secondary"
//   variant="contained"
//   size="large"
//   fullWidth={true}
//   onClick={() => alert("Button Clicked!")}
// />
