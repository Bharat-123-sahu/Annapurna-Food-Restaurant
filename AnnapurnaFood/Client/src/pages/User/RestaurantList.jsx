import React from "react";
import Navbar from "../../components/common/Navbar";
import SearchBar from "../../components/common/Searchbar";
import FilterBar from "../../components/User/RestaurantListing/FilterBar";
import RestaurantCards from "../../components/User/RestaurantListing/RestaurantCard";

import Footer from "../../components/common/Footer";
import PagePagination from "../../components/common/Pagination";
import {Restaurenadatamap} from "../../components/User/RestaurantListing/restaurenadatamap";
export const RestaurantList = () => {
  return (
    <>
      <Navbar />
      {/* <SearchBar /> */}
      {/* <FilterBar /> */}
      <Restaurenadatamap />
      <PagePagination />
      <Footer />
    </>
  );
};
