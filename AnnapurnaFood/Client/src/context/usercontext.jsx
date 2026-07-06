// src/context/UserContext.jsx
import React, { createContext, useState, useEffect, useCallback } from "react";
import api from "../apis/axiosconfigs"; // axios instance

// ✅ Create Context
export const UserContext = createContext({
  user: null,
  loading: false,
  isAuthenticated: false,
  registerUser: (data) => {},
  loginUser: (data) => {},
  logoutUser: () => {},
  fetchUserProfile: () => {},
  updateUserProfile: (data) => {},
  changePassword: (data) => {},
  fetchUserRestaurants: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ---------- REGISTER ----------
  const registerUser = async (data) => {
    try {
      setLoading(true);
      const res = await api.post("/user/register", data);
      if (res?.data?.user) {
        setUser(res.data.user);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Registration failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------- LOGIN ----------
  const loginUser = async (data) => {
    try {
      setLoading(true);
      const res = await api.post("/user/login", data, {
        withCredentials: true,
      });
      if (res?.data?.user) {
        setUser(res.data.user);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------- LOGOUT ----------
  const logoutUser = async () => {
    try {
      setLoading(true);
      await api.post("/user/logout", {}, { withCredentials: true });
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------- FETCH USER PROFILE ----------
  const fetchUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/user/profile"); //withCredential=true
      if (res?.data?.user) {
        setUser(res.data.user);
        setIsAuthenticated(true);
      }
    } catch (err) {
      setIsAuthenticated(false);
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------- UPDATE PROFILE ----------
  const updateUserProfile = async (data) => {
    try {
      setLoading(true);
      const res = await api.put("/user/profile/update", data, {
        withCredentials: true,
      });
      if (res?.data?.user) setUser(res.data.user);
    } catch (err) {
      console.error("Profile update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------- CHANGE PASSWORD ----------
  const changePassword = async (data) => {
    try {
      setLoading(true);
      await api.get("/user/profile/change-password", data, {
        withCredentials: true,
      });
      alert("Password changed successfully!");
    } catch (err) {
      console.error("Password change failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------- FETCH RESTAURANTS (Accessible to Users) ----------
  const fetchUserRestaurants = async () => {
    try {
      setLoading(true);
      const res = await api.get("/user/restaurants", { withCredentials: true });
      return res?.data?.restaurants ?? [];
    } catch (err) {
      console.error("Error fetching restaurants for user:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // ---------- AUTO FETCH ON PAGE LOAD ----------
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  // ---------- CONTEXT VALUE ----------
  const value = {
    user,
    loading,
    isAuthenticated,
    registerUser,
    loginUser,
    logoutUser,
    fetchUserProfile,
    updateUserProfile,
    changePassword,
    fetchUserRestaurants,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
