import react from "react";
import Dashboardroutes from "./dashboardroutes";
import Sidebar from "./Sidebar";

import React from 'react'
import { Outlet } from "react-router-dom";

export const RestaurantLayout = () => {
  return (
    <div style={{display:"flex"}}>
        <Sidebar/>
        <div style={{flexGrow:1,marginLeft:"-80vw",padding:"80px"}}>
        <Outlet/>
        </div>
    
    </div>
  );
}
