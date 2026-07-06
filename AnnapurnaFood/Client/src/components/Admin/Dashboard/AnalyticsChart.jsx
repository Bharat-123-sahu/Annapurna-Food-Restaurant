// components/admin/Dashboard/AnalyticsChart.jsx
// components/admin/Dashboard/AnalyticsChart.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsChart = () => {
  // Sample dataset
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
  ];

  const ordersData = [120, 180, 150, 210, 240, 190, 280, 300, 260, 310, 330];
  const revenueData = [25000, 31000, 27000, 35000, 40000, 32000, 45000, 47000, 42000, 49000, 51000];

  // Chart configuration
  const lineData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Orders",
        data: ordersData,
        borderColor: "#FF6A00",
        backgroundColor: "rgba(255, 106, 0, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#FF6A00",
      },
    ],
  };

  const barData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Revenue (₹)",
        data: revenueData,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "#FF6A00");
          gradient.addColorStop(1, "#EE0979");
          return gradient;
        },
        borderRadius: 6,
        barThickness: 20,
      },
    ],
  };

  const optionsLine = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: { color: "#333" },
      },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        ticks: { color: "#555" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#555" },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
  };

  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: { color: "#333" },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `₹${ctx.formattedValue}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#555" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#555" },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
  };

  return (
    <div className="container my-5">
      <Card
        className="shadow-lg border-0"
        sx={{
          borderRadius: "20px",
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box
            className="d-flex justify-content-between align-items-center flex-wrap"
            sx={{ mb: 3 }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "#FF6A00" }}
            >
              📊 Admin Analytics Overview
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Order & Revenue trends over time
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Charts */}
          <div className="row g-4">
            {/* Orders Line Chart */}
            <div className="col-md-6">
              <Card
                className="shadow-sm border-0"
                sx={{
                  borderRadius: "16px",
                  p: 3,
                  backgroundColor: "#fafafa",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: "#FF6A00", mb: 2 }}
                >
                  📦 Monthly Orders
                </Typography>
                <Line data={lineData} options={optionsLine} height={300} />
              </Card>
            </div>

            {/* Revenue Bar Chart */}
            <div className="col-md-6">
              <Card
                className="shadow-sm border-0"
                sx={{
                  borderRadius: "16px",
                  p: 3,
                  backgroundColor: "#fafafa",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: "#EE0979", mb: 2 }}
                >
                  💰 Monthly Revenue
                </Typography>
                <Bar data={barData} options={optionsBar} height={300} />
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsChart;


// import React from "react";
// import Sidebar from "../DashboardCommon/Sidebar";
// import DashboardHeader from "../DashboardCommon/DashboardHeader";
// import AnalyticsChart from "./AnalyticsChart";
// import { Box } from "@mui/material";

// const AdminDashboard = () => {
//   return (
//     <Box sx={{ display: "flex" }}>
//       <Sidebar />
//       <Box component="main" sx={{ flexGrow: 1, mt: 10, p: 3 }}>
//         <DashboardHeader restaurantName="Admin Panel" />
//         <AnalyticsChart />
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;

// useEffect(() => {
//   axios.get("/api/admin/analytics").then((res) => setData(res.data));
// }, []);
