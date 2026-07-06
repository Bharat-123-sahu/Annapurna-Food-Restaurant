// components/user/Orders/ErrorMessage.jsx
import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ReplayIcon from "@mui/icons-material/Replay";
import HomeIcon from "@mui/icons-material/Home";
import "bootstrap/dist/css/bootstrap.min.css";

const ErrorMessage = ({
  title = "Something Went Wrong!",
  message = "We couldn’t process your request. Please try again later.",
  onRetry,
  onGoHome,
}) => {
  return (
    <div className="container my-5 d-flex justify-content-center align-items-center">
      <Card
        className="shadow-lg border-0"
        sx={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "20px",
          textAlign: "center",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.85))",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          p: 2,
        }}
      >
        <CardContent>
          {/* Error Icon */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
              animation: "shake 0.4s ease-in-out",
            }}
          >
            <ErrorOutlineIcon
              sx={{
                fontSize: "5rem",
                color: "#f44336",
              }}
            />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#f44336",
              mb: 1,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#555",
              mb: 3,
              px: 2,
            }}
          >
            {message}
          </Typography>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {onRetry && (
              <Button
                variant="contained"
                startIcon={<ReplayIcon />}
                sx={{
                  backgroundColor: "#FF6A00",
                  borderRadius: "50px",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                  "&:hover": { backgroundColor: "#EE0979" },
                }}
                onClick={onRetry}
              >
                Try Again
              </Button>
            )}

            <Button
              variant="outlined"
              startIcon={<HomeIcon />}
              sx={{
                borderRadius: "50px",
                borderColor: "#FF6A00",
                color: "#FF6A00",
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                "&:hover": { backgroundColor: "rgba(255,106,0,0.1)" },
              }}
              onClick={onGoHome || (() => (window.location.href = "/"))}
            >
              Go to Home
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Keyframe Animation */}
      <style>
        {`
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
};

export default ErrorMessage;

// import React, { useState } from "react";
// import Navbar from "../../Navbar";
// import Footer from "../../Footer";
// import ErrorMessage from "./ErrorMessage";

// const PaymentErrorPage = () => {
//   const [retry, setRetry] = useState(false);

//   const handleRetry = () => {
//     setRetry(true);
//     setTimeout(() => {
//       alert("Retrying payment...");
//       setRetry(false);
//     }, 1500);
//   };

//   return (
//     <>
//       <Navbar />
//       {!retry ? (
//         <ErrorMessage
//           title="Payment Failed 💸"
//           message="Your payment could not be processed due to a network issue. Please check your connection and try again."
//           onRetry={handleRetry}
//           onGoHome={() => (window.location.href = "/")}
//         />
//       ) : (
//         <div className="text-center mt-5">
//           <Typography variant="h5" sx={{ color: "#FF6A00", fontWeight: 600 }}>
//             Retrying your payment... ⏳
//           </Typography>
//         </div>
//       )}
//       <Footer />
//     </>
//   );
// };

// export default PaymentErrorPage;
