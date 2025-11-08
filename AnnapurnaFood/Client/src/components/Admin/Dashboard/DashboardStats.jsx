// components/admin/Dashboard/DashboardStats.jsx
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import "bootstrap/dist/css/bootstrap.min.css";

const DashboardStats = ({
  stats = {
    totalOrders: 3200,
    totalRevenue: 510000,
    activeRestaurants: 58,
    totalUsers: 12400,
  },
}) => {
  const cards = [
    {
      title: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      icon: <ShoppingCartIcon sx={{ fontSize: 38, color: "#FF6A00" }} />,
      bg: "linear-gradient(135deg, rgba(255,106,0,0.15), rgba(238,9,121,0.15))",
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: <AttachMoneyIcon sx={{ fontSize: 38, color: "#EE0979" }} />,
      bg: "linear-gradient(135deg, rgba(238,9,121,0.15), rgba(255,106,0,0.1))",
    },
    {
      title: "Active Restaurants",
      value: stats.activeRestaurants,
      icon: <StorefrontIcon sx={{ fontSize: 38, color: "#00BFA6" }} />,
      bg: "linear-gradient(135deg, rgba(0,191,166,0.15), rgba(76,175,80,0.1))",
    },
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: <PeopleAltIcon sx={{ fontSize: 38, color: "#2196F3" }} />,
      bg: "linear-gradient(135deg, rgba(33,150,243,0.15), rgba(33,150,243,0.05))",
    },
  ];

  return (
    <div className="container-fluid my-4">
      <div className="row g-4">
        {cards.map((card, index) => (
          <div key={index} className="col-12 col-sm-6 col-lg-3">
            <Card
              className="shadow-sm border-0 h-100"
              sx={{
                borderRadius: "20px",
                background: card.bg,
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
                  justifyContent: "space-between",
                  px: 3,
                  py: 2,
                }}
              >
                <Box>{card.icon}</Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#333" }}
                  >
                    {card.value}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#555",
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;


// import React from "react";
// import Sidebar from "../DashboardCommon/Sidebar";
// import DashboardHeader from "../DashboardCommon/DashboardHeader";
// import DashboardStats from "./DashboardStats";
// import AnalyticsChart from "./AnalyticsChart";
// import { Box } from "@mui/material";

// const AdminDashboard = () => {
//   return (
//     <Box sx={{ display: "flex" }}>
//       <Sidebar />
//       <Box component="main" sx={{ flexGrow: 1, mt: 10, p: 3 }}>
//         <DashboardHeader restaurantName="Admin Analytics" />
//         <DashboardStats
//           stats={{
//             totalOrders: 3540,
//             totalRevenue: 525000,
//             activeRestaurants: 62,
//             totalUsers: 13250,
//           }}
//         />
//         <AnalyticsChart />
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;


// import { useEffect, useState } from "react";
// import axios from "axios";

// const [stats, setStats] = useState({});

// useEffect(() => {
//   axios.get("/api/admin/dashboard-stats").then((res) => {
//     setStats(res.data);
//   });
// }, []);

{/* <DashboardStats stats={stats} /> */}
