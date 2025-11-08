// components/user/Cart/PaymentOption.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaymentsIcon from "@mui/icons-material/Payments";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentOption = ({ onConfirm }) => {
  const [selected, setSelected] = useState("upi");

  const handlePayment = () => {
    if (onConfirm) onConfirm(selected);
    alert(`Payment option selected: ${selected.toUpperCase()} ✅`);
  };

  return (
    <Card
      className="shadow-sm border-0 mt-4"
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 3,
            textAlign: "center",
            color: "#FF6A00",
          }}
        >
          Select Payment Method 💳
        </Typography>

        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {/* UPI */}
            <Box
              className="d-flex align-items-center justify-content-between p-3 mb-2 rounded"
              sx={{
                border: selected === "upi" ? "2px solid #FF6A00" : "1px solid #ddd",
                backgroundColor:
                  selected === "upi" ? "rgba(255,106,0,0.08)" : "#fff",
                transition: "all 0.2s ease-in-out",
              }}
            >
              <Box className="d-flex align-items-center gap-2">
                <PaymentsIcon sx={{ color: "#FF6A00" }} />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  UPI / PhonePe / Google Pay
                </Typography>
              </Box>
              <FormControlLabel
                value="upi"
                control={<Radio sx={{ color: "#FF6A00" }} />}
                label=""
              />
            </Box>

            {/* Credit / Debit Card */}
            <Box
              className="d-flex align-items-center justify-content-between p-3 mb-2 rounded"
              sx={{
                border: selected === "card" ? "2px solid #FF6A00" : "1px solid #ddd",
                backgroundColor:
                  selected === "card" ? "rgba(255,106,0,0.08)" : "#fff",
              }}
            >
              <Box className="d-flex align-items-center gap-2">
                <CreditCardIcon sx={{ color: "#FF6A00" }} />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Credit / Debit Card
                </Typography>
              </Box>
              <FormControlLabel
                value="card"
                control={<Radio sx={{ color: "#FF6A00" }} />}
                label=""
              />
            </Box>

            {/* Net Banking */}
            <Box
              className="d-flex align-items-center justify-content-between p-3 mb-2 rounded"
              sx={{
                border:
                  selected === "netbanking" ? "2px solid #FF6A00" : "1px solid #ddd",
                backgroundColor:
                  selected === "netbanking"
                    ? "rgba(255,106,0,0.08)"
                    : "#fff",
              }}
            >
              <Box className="d-flex align-items-center gap-2">
                <AccountBalanceIcon sx={{ color: "#FF6A00" }} />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Net Banking
                </Typography>
              </Box>
              <FormControlLabel
                value="netbanking"
                control={<Radio sx={{ color: "#FF6A00" }} />}
                label=""
              />
            </Box>

            {/* Wallet */}
            <Box
              className="d-flex align-items-center justify-content-between p-3 mb-2 rounded"
              sx={{
                border: selected === "wallet" ? "2px solid #FF6A00" : "1px solid #ddd",
                backgroundColor:
                  selected === "wallet" ? "rgba(255,106,0,0.08)" : "#fff",
              }}
            >
              <Box className="d-flex align-items-center gap-2">
                <AccountBalanceWalletIcon sx={{ color: "#FF6A00" }} />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Wallets (Paytm / Amazon Pay)
                </Typography>
              </Box>
              <FormControlLabel
                value="wallet"
                control={<Radio sx={{ color: "#FF6A00" }} />}
                label=""
              />
            </Box>

            {/* Cash on Delivery */}
            <Box
              className="d-flex align-items-center justify-content-between p-3 mb-2 rounded"
              sx={{
                border: selected === "cod" ? "2px solid #FF6A00" : "1px solid #ddd",
                backgroundColor:
                  selected === "cod" ? "rgba(255,106,0,0.08)" : "#fff",
              }}
            >
              <Box className="d-flex align-items-center gap-2">
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Cash on Delivery (COD)
                </Typography>
              </Box>
              <FormControlLabel
                value="cod"
                control={<Radio sx={{ color: "#FF6A00" }} />}
                label=""
              />
            </Box>
          </RadioGroup>
        </FormControl>

        <Button
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
            "&:hover": {
              backgroundColor: "#EE0979",
            },
          }}
          onClick={handlePayment}
        >
          Confirm Payment Method
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentOption;

// import React, { useState } from "react";
// import PaymentOption from "./PaymentOption";
// import OrderSummary from "./OrderSummary";
// import { Typography } from "@mui/material";

// const CheckoutPage = () => {
//   const [selectedPayment, setSelectedPayment] = useState("upi");

//   const handleConfirmPayment = (method) => {
//     setSelectedPayment(method);
//   };

//   return (
//     <div className="container my-5">
//       <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
//         Checkout 💰
//       </Typography>

//       <div className="row">
//         <div className="col-12 col-md-7">
//           <PaymentOption onConfirm={handleConfirmPayment} />
//         </div>
//         <div className="col-12 col-md-5">
//           <OrderSummary subtotal={548} onPlaceOrder={() => alert(`Paid by ${selectedPayment}`)} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;
