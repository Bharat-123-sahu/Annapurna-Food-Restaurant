// components/Utils/ThemeSwitcher.jsx
import React, { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Reusable ThemeSwitcher component
 * Persists mode in localStorage
 * Supports animation and MUI styling
 */

const ThemeSwitcher = ({ onToggle }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (onToggle) onToggle(theme);
  }, [theme, onToggle]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Tooltip
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          onClick={toggleTheme}
          sx={{
            background:
              theme === "light"
                ? "linear-gradient(90deg, #FF6A00, #EE0979)"
                : "linear-gradient(90deg, #222, #444)",
            color: "#fff",
            boxShadow:
              theme === "light"
                ? "0 3px 12px rgba(255,106,0,0.4)"
                : "0 3px 12px rgba(255,255,255,0.2)",
            "&:hover": {
              background:
                theme === "light"
                  ? "linear-gradient(90deg, #EE0979, #FF6A00)"
                  : "linear-gradient(90deg, #333, #555)",
            },
          }}
          size="large"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: theme === "dark" ? 360 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {theme === "light" ? (
              <DarkModeIcon fontSize="medium" />
            ) : (
              <LightModeIcon fontSize="medium" />
            )}
          </motion.div>
        </IconButton>
      </motion.div>
    </Tooltip>
  );
};

export default ThemeSwitcher;

// import React, { useState } from "react";
// import ThemeSwitcher from "../Utils/ThemeSwitcher";
// import { Box, Typography } from "@mui/material";

// const HeaderWithTheme = () => {
//   const [theme, setTheme] = useState("light");

//   return (
//     <Box
//       sx={{
//         p: 3,
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         backgroundColor: theme === "light" ? "#f9f9f9" : "#121212",
//         color: theme === "light" ? "#333" : "#fff",
//         transition: "background-color 0.3s ease",
//       }}
//     >
//       <Typography variant="h6" sx={{ fontWeight: 700 }}>
//         {theme === "light" ? "☀️ Light Mode" : "🌙 Dark Mode"}
//       </Typography>
//       <ThemeSwitcher onToggle={(t) => setTheme(t)} />
//     </Box>
//   );
// };

// export default HeaderWithTheme;

// body[data-theme="light"] {
//   background-color: #fafafa;
//   color: #222;
//   transition: all 0.3s ease;
// }

// body[data-theme="dark"] {
//   background-color: #121212;
//   color: #f1f1f1;
//   transition: all 0.3s ease;
// }

// [data-theme="dark"] .MuiPaper-root {
//   background-color: #1f1f1f !important;
//   color: #fff !important;
// }

{
  /* <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
  <NotificationBell />
  <ThemeSwitcher onToggle={(theme) => console.log("Theme:", theme)} />
</Box> */
}
