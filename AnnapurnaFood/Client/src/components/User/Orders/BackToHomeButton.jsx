// components/user/common/BackToHomeButton.jsx
import React from "react";
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const BackToHomeButton = ({
  label = "Back to Home",
  iconPosition = "start", // start or end
  size = "medium",
  variant = "contained",
  color = "#FF6A00",
  textColor = "#fff",
  hoverColor = "#EE0979",
  redirectPath = "/",
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) return onClick();
    window.location.href = redirectPath;
  };

  return (
    <Button
      variant={variant}
      startIcon={iconPosition === "start" ? <HomeIcon /> : null}
      endIcon={iconPosition === "end" ? <HomeIcon /> : null}
      size={size}
      onClick={handleClick}
      sx={{
        backgroundColor: variant === "contained" ? color : "transparent",
        color: variant === "contained" ? textColor : color,
        borderColor: color,
        borderRadius: "50px",
        px: 3,
        py: 1,
        textTransform: "none",
        fontWeight: 600,
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor:
            variant === "contained" ? hoverColor : "rgba(255,106,0,0.1)",
          borderColor: hoverColor,
          color: "#fff",
          transform: "scale(1.05)",
        },
      }}
    >
      {label}
    </Button>
  );
};

export default BackToHomeButton;

// import React from "react";
// import BackToHomeButton from "../common/BackToHomeButton";
// import { Typography, Box } from "@mui/material";

// const Example = () => {
//   return (
//     <Box
//       sx={{
//         textAlign: "center",
//         mt: 10,
//       }}
//     >
//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Oops! Something went wrong.
//       </Typography>

//       <BackToHomeButton
//         label="Go to Home Page"
//         variant="contained"
//         color="#FF6A00"
//         hoverColor="#EE0979"
//       />
//     </Box>
//   );
// };

// export default Example;
