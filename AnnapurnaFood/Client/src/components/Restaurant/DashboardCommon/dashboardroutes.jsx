import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardHeader } from "./DashboardHeader";
import { AddFoodForm } from "../Management/AddFoodForm";
import { FoodList } from "../Management/FoodListTable";
import { RestaurantProfileForm } from "../Management/RestaurantProfileForm";
import { EditFood } from "../Management/EditFoodModal";
import { ViewOrder } from "../Management/ViewOrderModal";
import { RestaurantLayout } from "./restaurantLayout";
export default function Dashboardroutes() {
  return (
    <Routes>
      <Route element={<RestaurantLayout />}>
        <Route path="/dashboard" element={<DashboardHeader />} />
        <Route path="/orders" element={<ViewOrder />} />
        <Route path="/add-food" element={<AddFoodForm />} />
        <Route path="/edit-food" element={<EditFood />} />
        {/* <Route path="/setting" element={<Setting />} /> */}
        <Route path="/items" element={<FoodList />} />
        <Route path="/profile" element={<RestaurantProfileForm />} />
      </Route>
    </Routes>
  );
}

{
  /* <Route path="" element={}/>
<Route path="" element={}/>
<Route path="" element={}/> */
}
