import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);

  const { email, password, username } = inputValue;

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
    if (!email || !password || !username)
      return handleError("All fields are required!");
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:1245/signup",
        { ...inputValue },
        { withCredentials: true }
      );

      if (data.message === "User added successfully") {
        handleSuccess("Signup Successful! Redirecting...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        handleError(data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      handleError(error.response?.data?.message || "Server error!");
    } finally {
      setLoading(false);
      setInputValue({ email: "", password: "", username: "" });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light animate__animated animate__fadeIn">
      <div className="card shadow-lg p-4 p-md-5 rounded-4 col-11 col-md-6 col-lg-4 animate__animated animate__zoomIn">
        <h2 className="text-center mb-4 fw-bold text-primary">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={handleOnChange}
              className="form-control form-control-lg shadow-sm"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={email}
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
              value={password}
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-3 text-center text-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-primary fw-semibold">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
