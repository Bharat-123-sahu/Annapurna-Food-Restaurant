// components/user/Auth/ForgetPassword.jsx
import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Input,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { Otpcontext } from "../../../context/otpvarifycontext";
const ForgetPassword = ({ onBack, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [otpverify, setOtpVerify] = useState(false);
  // const {} = useContext(Otpcontext);
  const Navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      alert("Please enter a valid email address ❌");
      return;
    }

    setLoading(true);

    // Simulate backend API call (e.g. sending reset link)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (onSubmit) onSubmit(email);
    }, 1500);
  };

  const handlevarify = () => {
    Navigate("/passwordinput");
  };
  return (
    <div className="container my-5 d-flex justify-content-center">
      <Card
        className="shadow-lg border-0"
        sx={{
          width: "100%",
          maxWidth: "450px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.85)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          p: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#FF6A00",
              textAlign: "center",
              mb: 3,
            }}
          >
            Forgot Password 🔑
          </Typography>

          <>
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "gray",
                mb: 3,
              }}
            >
              Enter your registered email below to receive a password reset link
              📧
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "#FF6A00" }} />
                    </InputAdornment>
                  ),
                }}
                required
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: "#FF6A00",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: "50px",
                  py: 1.2,
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#EE0979" },
                }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Send OTP"
                )}
              </Button>
              {submitted ? (
                <Typography align="center" className="pt-5">
                  <TextField
                    type="number"
                    variant="outlined"
                    placeholder="enter otp"
                    max={999999}
                  />
                  <Button
                    className="p-3"
                    variant="contained"
                    onClick={handlevarify}
                  >
                    varify
                  </Button>
                </Typography>
              ) : null}
            </form>
          </>

          <div className="text-center mt-4">
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={onBack}
              sx={{
                textTransform: "none",
                color: "#FF6A00",
                fontWeight: 600,
                borderRadius: "50px",
              }}
            >
              Back to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgetPassword;

// import React, { useState } from "react";
// import AuthForm from "./AuthForm";
// import ForgetPassword from "./ForgetPassword";
// import Navbar from "../../Navbar";
// import Footer from "../../Footer";

// const AuthWrapper = () => {
//   const [showForgot, setShowForgot] = useState(false);

//   const handleAuthSubmit = (data, type) => {
//     console.log("Auth:", data, "Type:", type);
//   };

//   return (
//     <>
//       <Navbar />
//       {!showForgot ? (
//         <div>
//           <AuthForm onSubmit={handleAuthSubmit} />
//           <div className="text-center mt-3">
//             <button
//               className="btn btn-link text-decoration-none"
//               style={{ color: "#FF6A00", fontWeight: 600 }}
//               onClick={() => setShowForgot(true)}
//             >
//               Forgot Password?
//             </button>
//           </div>
//         </div>
//       ) : (
//         <ForgetPassword onBack={() => setShowForgot(false)} />
//       )}
//       <Footer />
//     </>
//   );
// };

// export default AuthWrapper;

// <div className="text-center">
//   <Typography
//     variant="h6"
//     sx={{ color: "#00C853", fontWeight: 700, mt: 2 }}
//   >
//     ✅ Email Sent Successfully!
//   </Typography>
//   <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
//     Check your inbox for a password reset link.
//   </Typography>
// </div>
// <input type="number" required placeholder="enter otp" />
// null
