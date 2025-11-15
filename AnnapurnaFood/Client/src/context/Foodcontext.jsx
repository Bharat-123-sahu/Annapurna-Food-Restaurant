// src/context/FoodContext.jsx
import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import api from "../apis/axiosconfigs"; // your axios instance

// ✅ Create Context
export const FoodContext = createContext({
  foods: [],
  food: null,
  loading: false,
  popularFoods: [],
  fetchAllFoods: () => {},
  fetchFoodById: (id) => {},
  fetchFoodByCategory: (category) => {},
  fetchFoodByRestaurant: (restaurantId) => {},
  addFood: (restaurantId, data) => {},
  updateFood: (id, data) => {},
  deleteFood: (id) => {},
  updateFoodAvailability: (data) => {},
});

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------- GET ALL FOODS ----------
  const fetchAllFoods = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/food");
      const list = res?.data?.foods ?? [];
      setFoods(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Error fetching all foods:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------- GET FOOD BY ID ----------
  const fetchFoodById = useCallback(async (id) => {
    //why callbacks
    if (!id) return;
    setLoading(true);
    try {
      const res = await api.get(`/food/${id}`);
      setFood(res?.data?.food ?? null);
    } catch (err) {
      console.error("Error fetching food by ID:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------- GET FOOD BY CATEGORY ----------
  const fetchFoodByCategory = useCallback(async (category) => {
    if (!category) return;
    setLoading(true);
    try {
      const res = await api.get(`/food/${category}`);
      setFoods(res?.data?.foods ?? []);
    } catch (err) {
      console.error("Error fetching food by category:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------- GET FOOD BY RESTAURANT ----------
  const fetchFoodByRestaurant = useCallback(async (restaurantId) => {
    if (!restaurantId) return;
    setLoading(true);
    try {
      const res = await api.get(`/food/restaurant/${restaurantId}`);
      setFoods(res?.data?.foods ?? []);
    } catch (err) {
      console.error("Error fetching food by restaurant:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------- ADD FOOD ----------
  const addFood = async (restaurantId, data) => {
    try {
      const res = await api.post(`/food/add/${restaurantId}`, data);
      const newFood = res?.data?.food;
      if (newFood) setFoods((prev) => [...prev, newFood]);
    } catch (err) {
      console.error("Error adding food:", err);
    }
  };

  // ---------- UPDATE FOOD ----------
  const updateFood = async (id, data) => {
    try {
      const res = await api.put(`/food/update/${id}`, data);
      const updated = res?.data?.food;
      if (updated) {
        setFoods((prev) => prev.map((f) => (f._id === id ? updated : f)));
      }
    } catch (err) {
      console.error("Error updating food:", err);
    }
  };

  // ---------- DELETE FOOD ----------
  const deleteFood = async (id) => {
    try {
      await api.delete(`/food/delete/${id}`);
      setFoods((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Error deleting food:", err);
    }
  };

  // ---------- UPDATE FOOD AVAILABILITY ----------
  const updateFoodAvailability = async (data) => {
    try {
      const res = await api.put(`/food/update/available`, data);
      const updated = res?.data?.food;
      if (updated) {
        setFoods((prev) =>
          prev.map((f) => (f._id === updated._id ? updated : f))
        );
      }
    } catch (err) {
      console.error("Error updating food availability:", err);
    }
  };

  // ---------- AUTO FETCH ALL FOODS ----------
  // useEffect(() => {
  //   fetchAllFoods();
  // }, [fetchAllFoods]);

  // ---------- POPULAR FOODS ----------
  const popularFoods = useMemo(() => {
    return foods.filter((f) => Number(f.rating) >= 4.5);
  }, [foods]);

  // ---------- CONTEXT VALUE ----------
  const value = {
    foods,
    food,
    loading,
    popularFoods,
    fetchAllFoods,
    fetchFoodById,
    fetchFoodByCategory,
    fetchFoodByRestaurant,
    addFood,
    updateFood,
    deleteFood,
    updateFoodAvailability,
  };

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
};
