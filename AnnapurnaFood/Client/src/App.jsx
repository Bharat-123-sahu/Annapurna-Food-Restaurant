import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import { Cart } from "./pages/User/cart";

import { HomePage } from "./pages/User/HomePage";
import { Login } from "./pages/User/Login";
import { MenuPage } from "./pages/User/MenuPage";
import { Order } from "./pages/User/Order";
import { Profile } from "./pages/User/Profile";
import { RestaurantDetails } from "./pages/User/RestaurantDetails";
import { RestaurantList } from "./pages/User/RestaurantList";
import { ProtectRoute } from "./protectsroutes";

import ForgetPassword from "./components/User/Auth/ForgotPasswordModal";
import PaymentOption from "./components/User/Cart/PaymentOptions";
import Dashboardroutes from "./components/Restaurant/DashboardCommon/dashboardroutes";
import Sidebar from "./components/Restaurant/DashboardCommon/Sidebar";
import RestaurantLogin from "./pages/Restaurant/Restaurantlogin";
import RestaurantRegister from "./pages/Restaurant/ReastaurantSignup";
// import PasswordInput from "./components/User/Auth/PasswordInput";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/menu"
          element={
            <ProtectRoute>
              <MenuPage />
            </ProtectRoute>
          }
        />
        <Route
          path="/restaurant"
          element={
            <ProtectRoute>
              <RestaurantList />
            </ProtectRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectRoute>
              <Order />
            </ProtectRoute>
          }
        />
        <Route
          path="/restaurantdetail/:id"
          element={
            <ProtectRoute>
              <RestaurantDetails />
            </ProtectRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectRoute>
              <Cart />
            </ProtectRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectRoute>
              <Profile />
            </ProtectRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />

        <Route path="/passwordinput" element={<PaymentOption />} />

        <Route path="/sidebarres" element={<Sidebar />} />

        <Route path="/dashboard/*" element={<Dashboardroutes />} />
        <Route path="/reastaurant-login" element={<RestaurantLogin />} />
        <Route path="/reastaurant-register" element={<RestaurantRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
