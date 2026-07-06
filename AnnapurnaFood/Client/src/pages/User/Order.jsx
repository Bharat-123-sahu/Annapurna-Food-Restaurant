import React from "react";
import Navbar from "../../components/common/Navbar";
import SuccessManager from "../../components/User/Orders/SuccessMessage";
import BackToHomeButton from "../../components/User/Orders/BackToHomeButton";
import Footer from "../../components/common/Footer";

export const Order = () => {
  return (
    <>
      <Navbar />
      <SuccessManager />
      <BackToHomeButton />
      <Footer />
    </>
  );
};
