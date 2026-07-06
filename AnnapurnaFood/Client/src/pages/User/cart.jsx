import React from "react";
import Navbar from "../../components/common/Navbar";
import CartItemCard from "../../components/User/Cart/CartItemCard";
import OrderSummary from "../../components/User/Cart/OrderSummary";
import { CheckOut } from "./CheckOut";
import Footer from "../../components/common/Footer";
import CartMain from "../../components/User/Cart/cartmain";

export const Cart = () => {
  return (
    <>
      <Navbar />
      {/* <CartItemCard /> */}
      <CartMain />
      {/* <OrderSummary /> */}

      <Footer />
    </>
  );
};
