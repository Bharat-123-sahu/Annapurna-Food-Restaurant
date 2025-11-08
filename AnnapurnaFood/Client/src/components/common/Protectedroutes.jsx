// ProtectedRoutes.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * ProtectedRoutes
 * Usage: Wrap your routes inside <Route element={<ProtectedRoutes />}>
 * This component will check if user is authenticated.
 */
const ProtectedRoutes = ({ isAuthenticated }) => {
  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the nested routes
  return <Outlet />;
};

export default ProtectedRoutes;

// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ProtectedRoutes from "./ProtectedRoutes";

// import Login from "./Login";
// import Dashboard from "./Dashboard";
// import Profile from "./Profile";

// const App = () => {
//   // Example: Authentication state
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return (
//     <Router>
//       <Routes>
//         {/* Public Route */}
//         <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

//         {/* Protected Routes */}
//         <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/profile" element={<Profile />} />
//         </Route>

//         {/* Fallback */}
//         <Route path="*" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
