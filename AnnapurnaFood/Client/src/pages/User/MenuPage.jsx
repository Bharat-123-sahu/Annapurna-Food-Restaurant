import React from "react";
import Navbar from "../../components/common/Navbar";
import SearchBar from "../../components/common/Searchbar";
import FilterBar from "../../components/User/RestaurantListing/FilterBar";
import MenuSection from "../../components/User/Menu/Menuitems";
import PagePagination from "../../components/common/Pagination";
import Footer from "../../components/common/Footer";

export const MenuPage = () => {
  return (
    <>
      <Navbar />
      <SearchBar />
      <FilterBar />
      <MenuSection />
      <PagePagination />
      <Footer />
    </>
  );
};
