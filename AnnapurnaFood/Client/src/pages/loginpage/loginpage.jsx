import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleError = (err) =>
    toast.error(err, { position: "bottom-left", autoClose: 3000 });

  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-left", autoClose: 2000 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.email || !inputValue.password)
      return handleError("All fields are required!");
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:1245/login",
        { ...inputValue },
        { withCredentials: true }
      );

      if (data.message === "User login successful") {
        handleSuccess("Login Successful! Redirecting...");
        setTimeout(() => navigate("/home"), 1500);
      } else {
        handleError(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      handleError(error.response?.data?.message || "Server error!");
    } finally {
      setLoading(false);
      setInputValue({ email: "", password: "" });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light animate__animated animate__fadeIn">
      <div className="card shadow-lg p-4 p-md-5 rounded-4 col-11 col-md-6 col-lg-4 animate__animated animate__zoomIn">
        <h2 className="text-center mb-4 fw-bold text-primary">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={inputValue.email}
              placeholder="Enter your email"
              onChange={handleOnChange}
              className="form-control form-control-lg shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={inputValue.password}
              placeholder="Enter your password"
              onChange={handleOnChange}
              className="form-control form-control-lg shadow-sm"
            />
          </div>
          <button
            type="submit"
            className={`btn btn-primary w-100 py-2 fs-5 fw-bold ${
              loading ? "disabled" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-3 text-center text-muted">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary fw-semibold">
            Sign Up
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
