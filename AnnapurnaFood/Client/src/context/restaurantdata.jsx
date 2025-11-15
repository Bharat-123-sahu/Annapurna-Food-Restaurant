// src/context/RestaurantContext.jsx
import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import api from "../apis/axiosconfigs"; // your configured axios instance

// ✅ Create Context
export const RestaurantContext = createContext({
  restaurants: [],
  restaurant: null,
  popular: [],
  loading: false,
  fetchRestaurants: () => {},
  fetchRestaurantById: (id) => {},
  addRestaurant: (data) => {},
  updateRestaurant: (id, data) => {},
  deleteRestaurant: (id) => {},
  addFoodToRestaurant: (id, foodData) => {},
});

export const RastaurantProvider = ({ children }) => {
  // ---------- STATES ----------
  const [restaurants, setRestaurants] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------- FETCH ALL RESTAURANTS ----------
  const fetchRestaurants = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/rastaurant");
      const list = res?.data?.restaurants ?? [];
      setRestaurants(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------- FETCH RESTAURANT BY ID ----------
  const fetchRestaurantById = useCallback(async (id) => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await api.get(`/rastaurant/${id}`);
      setRestaurant(res?.data?.restaurant ?? null);
    } catch (err) {
      console.error("Error fetching restaurant by ID:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------- ADD NEW RESTAURANT ----------
  const addRestaurant = async (data) => {
    try {
      const res = await api.post("/rastaurant", data);
      setRestaurants((prev) => [...prev, res.data.restaurant]);
    } catch (err) {
      console.error("Error adding restaurant:", err);
    }
  };

  // ---------- UPDATE RESTAURANT ----------
  const updateRestaurant = async (id, data) => {
    try {
      const res = await api.put(`/rastaurant/${id}`, data);
      setRestaurants((prev) =>
        prev.map((r) => (r._id === id ? { ...r, ...res.data.restaurant } : r))
      );
    } catch (err) {
      console.error("Error updating restaurant:", err);
    }
  };

  // ---------- DELETE RESTAURANT ----------
  const deleteRestaurant = async (id) => {
    try {
      await api.delete(`/rastaurant/${id}`);
      setRestaurants((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error deleting restaurant:", err);
    }
  };

  // ---------- ADD FOOD TO A RESTAURANT ----------
  const addFoodToRestaurant = async (restaurantId, foodData) => {
    try {
      const res = await api.post(`/rastaurant/${restaurantId}/foods`, foodData);
      // Update the specific restaurant’s foods if loaded
      setRestaurants((prev) =>
        prev.map((r) =>
          r._id === restaurantId
            ? { ...r, foods: [...(r.foods || []), res.data.food] }
            : r
        )
      );
      // If viewing single restaurant
      if (restaurant && restaurant._id === restaurantId) {
        setRestaurant((prev) => ({
          ...prev,
          foods: [...(prev.foods || []), res.data.food],
        }));
      }
    } catch (err) {
      console.error("Error adding food:", err);
    }
  };

  // ---------- POPULAR RESTAURANTS ----------
  const popular = useMemo(
    () => restaurants.filter((r) => Number(r?.rating) >= 4.5),
    [restaurants]
  );

  // ---------- INITIAL FETCH ----------
  // useEffect(() => {
  //   fetchRestaurants();
  // }, [fetchRestaurants]);

  // ---------- CONTEXT VALUE ----------
  const value = {
    restaurants,
    restaurant,
    popular,
    loading,
    fetchRestaurants,
    fetchRestaurantById,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    addFoodToRestaurant,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};
