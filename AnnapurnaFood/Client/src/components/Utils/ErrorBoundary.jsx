// components/Utils/ErrorBoundary.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import "bootstrap/dist/css/bootstrap.min.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // Catch errors in child components
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Log error details
  componentDidCatch(error, errorInfo) {
    console.error("🧩 Caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
    // Optionally send error info to your backend:
    // axios.post('/api/logs', { error, errorInfo });
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Box
            className="text-center my-5 p-4"
            sx={{
              backgroundColor: "rgba(255,106,0,0.05)",
              borderRadius: "20px",
              maxWidth: "600px",
              margin: "auto",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              <ReportGmailerrorredIcon
                sx={{ fontSize: 80, color: "#EE0979" }}
              />
            </motion.div>

            <Typography variant="h5" sx={{ fontWeight: 700, mt: 2 }}>
              Oops! Something went wrong 😔
            </Typography>

            <Typography variant="body2" sx={{ color: "gray", mt: 1, mb: 3 }}>
              {this.state.error?.message ||
                "An unexpected error occurred. Please try again."}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="contained"
                onClick={this.handleReload}
                sx={{
                  background: "linear-gradient(90deg, #FF6A00, #EE0979)",
                  borderRadius: "50px",
                  fontWeight: 600,
                  textTransform: "none",
                  px: 4,
                  py: 1,
                  "&:hover": {
                    background: "linear-gradient(90deg, #EE0979, #FF6A00)",
                  },
                }}
              >
                🔄 Reload Page
              </Button>

              {this.props.onBack && (
                <Button
                  variant="outlined"
                  onClick={this.props.onBack}
                  sx={{
                    borderColor: "#FF6A00",
                    color: "#FF6A00",
                    borderRadius: "50px",
                    fontWeight: 600,
                    textTransform: "none",
                    px: 4,
                    py: 1,
                    "&:hover": {
                      backgroundColor: "rgba(255,106,0,0.1)",
                    },
                  }}
                >
                  ⬅ Go Back
                </Button>
              )}
            </Box>

            {process.env.NODE_ENV === "development" && this.state.errorInfo && (
              <Box
                sx={{
                  mt: 3,
                  backgroundColor: "#fff",
                  textAlign: "left",
                  borderRadius: "12px",
                  p: 2,
                  fontSize: "0.85rem",
                  color: "#444",
                  overflowX: "auto",
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  🔍 Error Details (Dev Mode Only):
                </Typography>
                <pre style={{ whiteSpace: "pre-wrap" }}>
                  {this.state.errorInfo.componentStack}
                </pre>
              </Box>
            )}
          </Box>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
// Or, protect only critical routes:
// import React from "react";
// import ErrorBoundary from "../Utils/ErrorBoundary";
// import AdminDashboard from "../Admin/Dashboard/AdminDashboard";

// const App = () => {
//   return (
//     <ErrorBoundary>
//       <AdminDashboard />
//     </ErrorBoundary>
//   );
// };

// export default App;

{
  /* <ErrorBoundary onBack={() => navigate(-1)}>
  <OrdersPage />
</ErrorBoundary> */
}

// 🧠 Advanced Integration

// You can log errors to a backend or monitoring tool:

// componentDidCatch(error, info) {
//   axios.post("/api/errors/log", {
//     message: error.message,
//     stack: info.componentStack,
//   });
// }
