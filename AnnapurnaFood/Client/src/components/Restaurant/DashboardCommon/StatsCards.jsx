// components/restaurant/DashboardCommon/StatsCards.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Tooltip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";

const StatsCards = ({
  stats = {
    totalOrders: 1250,
    revenue: 84950,
    customers: 580,
    delivered: 1180,
  },
}) => {
  const cards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <ShoppingCartIcon sx={{ fontSize: 38, color: "#FF6A00" }} />,
      color: "#FF6A00",
      bg: "linear-gradient(135deg, rgba(255,106,0,0.1), rgba(255,106,0,0.05))",
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: <AttachMoneyIcon sx={{ fontSize: 38, color: "#EE0979" }} />,
      color: "#EE0979",
      bg: "linear-gradient(135deg, rgba(238,9,121,0.1), rgba(255,106,0,0.05))",
    },
    {
      title: "Customers",
      value: stats.customers,
      icon: <PeopleAltIcon sx={{ fontSize: 38, color: "#00BFA6" }} />,
      color: "#00BFA6",
      bg: "linear-gradient(135deg, rgba(0,191,166,0.1), rgba(0,191,166,0.05))",
    },
    {
      title: "Delivered Orders",
      value: stats.delivered,
      icon: <LocalShippingIcon sx={{ fontSize: 38, color: "#4CAF50" }} />,
      color: "#4CAF50",
      bg: "linear-gradient(135deg, rgba(76,175,80,0.1), rgba(76,175,80,0.05))",
    },
  ];

  return (
    <div className="container-fluid mt-4">
      
      <div className="row g-4">
        {cards.map((card) => (
          <div key={card.title} className="col-12 col-sm-6 col-lg-3">
            <Tooltip title={`View ${card.title.toLowerCase()} details`} arrow>
              <Card
                className="shadow-sm border-0 h-100"
                sx={{
                  borderRadius: "16px",
                  background: "#fff",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 3,
                    background: card.bg,
                    borderRadius: "16px",
                  }}
                >
                  {/* Icon Section */}
                  <Box
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                      padding: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 60,
                      height: 60,
                      boxShadow: `0 0 10px ${card.color}40`,
                    }}
                  >
                    {card.icon}
                  </Box>

                  {/* Text Section */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: "#333" }}
                    >
                      {card.value}
                    </Typography>
                    <Divider
                      sx={{ width: "50%", my: 1, borderColor: "#ddd" }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: card.color,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {card.title}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;

// import React from "react";
// import DashboardHeader from "./DashboardHeader";
// import Sidebar from "./Sidebar";
// import StatsCards from "./StatsCards";
// import { Box } from "@mui/material";

// const RestaurantDashboard = () => {
//   return (
//     <Box sx={{ display: "flex" }}>
//       <Sidebar />
//       <Box component="main" sx={{ flexGrow: 1, mt: 10, p: 3 }}>
//         <DashboardHeader restaurantName="Annapurna Kitchen" />
//         <h4 className="fw-bold mt-4 mb-3">Dashboard Overview 📊</h4>
//         <StatsCards
//           stats={{
//             totalOrders: 1320,
//             revenue: 94560,
//             customers: 620,
//             delivered: 1275,
//           }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default RestaurantDashboard;
