import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";

import HeroSection from "../../components/User/Home/HeroSection";
import NewsLetters from "../../components/User/Home/Newsletter";
import { Populatfooditem } from "../../components/User/Home/popularfooditem";
import { PopulatRestaurantsItem } from "../../components/User/Home/popularreastaurantitems";

import PopularRestaurants from "../../components/User/Home/PopularRestaurants";
import TestiMonials from "../../components/User/Home/Testimonials";

export const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      {/* <CategoryList /> */}
      <PopulatRestaurantsItem />
      <Populatfooditem />
      <TestiMonials />
      <NewsLetters />
      <Footer />
    </>
  );
};
