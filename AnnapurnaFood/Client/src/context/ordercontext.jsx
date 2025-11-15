// src/context/OrderContext.jsx
import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import api from "../apis/axiosconfigs"; // axios instance

// ✅ Create Context
export const OrderContext = createContext({
  orders: [],
  order: null,
  loading: false,
  createOrder: (orderData) => {},
  fetchUserOrders: () => {},
  fetchOrderById: (id) => {},
  cancelOrder: (id) => {},
  deleteOrder: (id) => {},
  fetchAllOrders: () => {},
  updateOrderStatus: (id, status) => {},
  updatePaymentStatus: (id, paymentStatus) => {},
});

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------- CREATE NEW ORDER ----------
  const createOrder = async (orderData) => {
    try {
      setLoading(true);
      const res = await api.post("/order/add", orderData, {
        withCredentials: true,
      });
      const newOrder = res?.data?.order;
      if (newOrder) setOrders((prev) => [...prev, newOrder]);
    } catch (err) {
      console.error("Error creating order:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------- GET USER ORDERS ----------
  const fetchUserOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/order", { withCredentials: true });
      const list = res?.data?.orders ?? [];
      setOrders(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Error fetching user orders:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------- GET ORDER BY ID ----------
  const fetchOrderById = useCallback(async (id) => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await api.get(`/order/byId/${id}`, { withCredentials: true });
      setOrder(res?.data?.order ?? null);
    } catch (err) {
      console.error("Error fetching order by ID:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------- CANCEL ORDER ----------
  const cancelOrder = async (id) => {
    try {
      const res = await api.put(`/order/cancel/${id}`, {}, { withCredentials: true });
      const updated = res?.data?.order;
      if (updated)
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? updated : o))
        );
    } catch (err) {
      console.error("Error cancelling order:", err);
    }
  };

  // ---------- DELETE ORDER ----------
  const deleteOrder = async (id) => {
    try {
      await api.put(`/order/delete/${id}`, {}, { withCredentials: true });
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  // ---------- ADMIN: GET ALL ORDERS ----------
  const fetchAllOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/order/all-orders", { withCredentials: true });
      const list = res?.data?.orders ?? [];
      setOrders(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Error fetching all orders:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------- ADMIN: UPDATE ORDER STATUS ----------
  const updateOrderStatus = async (id, status) => {
    try {
      const res = await api.put(
        `/order/status/${id}`,
        { status },
        { withCredentials: true }
      );
      const updated = res?.data?.order;
      if (updated)
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? updated : o))
        );
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  // ---------- ADMIN: UPDATE PAYMENT STATUS ----------
  const updatePaymentStatus = async (id, paymentStatus) => {
    try {
      const res = await api.put(
        `/order/paymentstatus/${id}`,
        { paymentStatus },
        { withCredentials: true }
      );
      const updated = res?.data?.order;
      if (updated)
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? updated : o))
        );
    } catch (err) {
      console.error("Error updating payment status:", err);
    }
  };

  // ---------- CONTEXT VALUE ----------
  const value = {
    orders,
    order,
    loading,
    createOrder,
    fetchUserOrders,
    fetchOrderById,
    cancelOrder,
    deleteOrder,
    fetchAllOrders,
    updateOrderStatus,
    updatePaymentStatus,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
