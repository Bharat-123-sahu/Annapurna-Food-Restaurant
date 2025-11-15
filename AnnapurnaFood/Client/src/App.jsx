import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Badge from "./components/Utils/Badge";
import Breadcrumb from "./components/Utils/Breadcrumb";
import ChatWidget from "./components/Utils/ChatWidget";
import EmptyState from "./components/Utils/EmptyState";
import ErrorBoundary from "./components/Utils/ErrorBoundary";
import FileUploader from "./components/Utils/FileUploader";
import ImageUploader from "./components/Utils/ImageUploader";
import MapComponent from "./components/Utils/MapComponent";
import NotificationBell from "./components/Utils/NotificationBell";
import RatingStars from "./components/Utils/RatingStars";
import SupportPopup from "./components/Utils/SupportPopup";
import Tag from "./components/Utils/Tag";
import ThemeSwitcher from "./components/Utils/ThemeSwitcher";
import { Cart } from "./pages/User/cart";
import { CheckOut } from "./pages/User/CheckOut";
import { HomePage } from "./pages/User/HomePage";
import { Login } from "./pages/User/Login";
import { MenuPage } from "./pages/User/MenuPage";
import { Order } from "./pages/User/Order";
import { Profile } from "./pages/User/Profile";
import { RestaurantDetails } from "./pages/User/RestaurantDetails";
import { RestaurantList } from "./pages/User/RestaurantList";
import { ProtectRoute } from "./protectsroutes";
import { Restaurenadatamap } from "./components/User/RestaurantListing/restaurenadatamap";

function App() {
  return (
    // <>
    // <HomePage/>
    // <Cart/>
    // <CheckOut/>
    // <Login/>
    // <MenuPage/>
    // <Order/>
    // <Profile/>
    // <RestaurantDetails/>
    // <RestaurantList/>

    // </>
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
          }/>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
