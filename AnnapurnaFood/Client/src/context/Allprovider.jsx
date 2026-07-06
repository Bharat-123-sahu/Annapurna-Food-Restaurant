import React from "react";
import { UserProvider } from "./usercontext";
import { RastaurantProvider } from "./restaurantdata";
import { OrderProvider } from "./ordercontext";
import { CartProvider } from "./cartcontext";
import { FoodProvider } from "./Foodcontext";
// import { OtpProvider } from "./otpvarifycontext";

export const AllProviders = ({ children }) => (
  <UserProvider>
    <CartProvider>
      <RastaurantProvider>
        <OrderProvider>
          <FoodProvider>{children}</FoodProvider>
        </OrderProvider>
      </RastaurantProvider>
    </CartProvider>
  </UserProvider>
);
