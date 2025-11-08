// components/user/Auth/PasswordInput.jsx
import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  LinearProgress,
  Typography,
  Box,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";

const PasswordInput = ({
  label = "Password",
  name = "password",
  value,
  onChange,
  required = true,
  showStrength = false,
  size = "small",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Calculate password strength
  const getPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[@$!%*?&]/.test(pass)) strength += 1;
    return strength;
  };

  const strength = getPasswordStrength(value || "");

  const getStrengthLabel = (level) => {
    switch (level) {
      case 0:
      case 1:
        return { text: "Weak", color: "#f44336" };
      case 2:
        return { text: "Medium", color: "#ff9800" };
      case 3:
      case 4:
        return { text: "Strong", color: "#4caf50" };
      default:
        return { text: "", color: "#ccc" };
    }
  };

  const { text, color } = getStrengthLabel(strength);

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        fullWidth
        required={required}
        name={name}
        label={label}
        variant="outlined"
        size={size}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon sx={{ color: "#FF6A00" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOff sx={{ color: "#555" }} />
                ) : (
                  <Visibility sx={{ color: "#555" }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            "&:hover fieldset": { borderColor: "#FF6A00" },
            "&.Mui-focused fieldset": { borderColor: "#EE0979" },
          },
        }}
      />

      {/* Password Strength Indicator */}
      {showStrength && value && (
        <Box sx={{ mt: 1 }}>
          <LinearProgress
            variant="determinate"
            value={(strength / 4) * 100}
            sx={{
              height: 6,
              borderRadius: "3px",
              backgroundColor: "#eee",
              "& .MuiLinearProgress-bar": {
                backgroundColor: color,
              },
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: color,
              fontWeight: 600,
              display: "block",
              mt: 0.5,
              textAlign: "right",
            }}
          >
            {text}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PasswordInput;

// import React, { useState } from "react";
// import { Button, Box } from "@mui/material";
// import PasswordInput from "./PasswordInput";

// const ExampleForm = () => {
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Password Submitted: ${password}`);
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{
//         width: "100%",
//         maxWidth: "400px",
//         mx: "auto",
//         mt: 5,
//         p: 3,
//         borderRadius: "16px",
//         boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
//       }}
//     >
//       <PasswordInput
//         label="Enter Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         showStrength
//       />

//       <Button
//         type="submit"
//         fullWidth
//         variant="contained"
//         sx={{
//           mt: 3,
//           backgroundColor: "#FF6A00",
//           borderRadius: "50px",
//           py: 1.2,
//           textTransform: "none",
//           fontWeight: 600,
//           "&:hover": { backgroundColor: "#EE0979" },
//         }}
//       >
//         Submit
//       </Button>
//     </Box>
//   );
// };

// export default ExampleForm;
