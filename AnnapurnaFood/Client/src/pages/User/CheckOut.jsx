import React from "react";
import Navbar from "../../components/common/Navbar";
import AddressManager from "../../components/User/Profile/AddressManager";
import PaymentOption from "../../components/User/Cart/PaymentOptions";
import OrderSummary from "../../components/User/Cart/OrderSummary";
import Footer from "../../components/common/Footer";

export const CheckOut = () => {
  return (
    <>
      <Navbar />
      {/* <AddressManager/> */}
      <PaymentOption />
      <OrderSummary />
      {/* <PlaceOrderButton/> */}
      <Footer />
    </>
  );
};
