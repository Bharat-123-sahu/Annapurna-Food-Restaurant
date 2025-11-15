import React from "react";
import Navbar from "../../components/common/Navbar";
import ProfileDetail from "../../components/User/Profile/ProfileDetails";
import EditProfileForm from "../../components/User/Profile/EditProfileForm";
import OrderHistory from "../../components/User/Profile/OrderHistory";
import AddressManager from "../../components/User/Profile/AddressManager";
import Footer from "../../components/common/Footer";

export const Profile = () => {
  return (
    <>
      <Navbar />
      <ProfileDetail />
      <EditProfileForm />
      <OrderHistory />
      <AddressManager />
      <Footer />
    </>
  );
};
