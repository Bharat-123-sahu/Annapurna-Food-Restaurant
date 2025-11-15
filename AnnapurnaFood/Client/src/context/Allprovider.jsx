import React from "react";
import { UserProvider } from "./usercontext";
import { RastaurantProvider } from "./restaurantdata";
import { OrderProvider } from "./ordercontext";
import { CartProvider } from "./cartcontext";
import { FoodProvider } from "./Foodcontext";

export const AllProviders = ({ children }) => (
  <UserProvider>
    <RastaurantProvider>
      <OrderProvider>
        <CartProvider>
          <FoodProvider>{children}</FoodProvider>
        </CartProvider>
      </OrderProvider>
    </RastaurantProvider>
  </UserProvider>
);
