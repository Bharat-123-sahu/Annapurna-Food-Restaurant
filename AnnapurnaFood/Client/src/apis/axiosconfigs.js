import axios from "axios";
import React from "react";

const instance = axios.create({
  baseURL: "http://localhost:2000",
  withCredentials: true,
});
instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ⭐ REQUIRED
  }
  return config;
});

export default instance;
