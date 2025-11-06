// Alert.jsx
import React from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomAlert = ({
  severity = "info", // info, success, warning, error
  message="wrong text field",
  open = true,
  onClose,
  variant = "outlined", // filled, outlined, standard
  responsive = true,
}) => {
  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        variant={variant}
        className={responsive ? "container my-2" : ""}
        action={
          onClose ? (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          ) : null
        }
        sx={{
          borderRadius: "12px",
          fontWeight: 500,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          fontSize: "1rem",
          textAlign: "center",
          "@media (max-width: 576px)": {
            fontSize: "0.85rem",
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
        {message}
      </Alert>
    </Collapse>
  );
};

export default CustomAlert;
