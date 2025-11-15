import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export const ProtectRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  // Optional: redirect immediately when token missing
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // If no token, block route and redirect
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, show the protected component
  return children;
};
