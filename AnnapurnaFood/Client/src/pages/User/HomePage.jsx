import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import CategoryList from "../../components/User/Home/CategoryList";
import HeroSection from "../../components/User/Home/HeroSection";
import NewsLetters from "../../components/User/Home/Newsletter";
import PopularFood from "../../components/User/Home/PopularFoods";
import PopularRestaurants from "../../components/User/Home/PopularRestaurants";
import TestiMonials from "../../components/User/Home/Testimonials";

export const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      {/* <CategoryList /> */}
      <PopularRestaurants />
      <PopularFood />
      <TestiMonials />
      <NewsLetters />
      <Footer />
    </>
  );
};
