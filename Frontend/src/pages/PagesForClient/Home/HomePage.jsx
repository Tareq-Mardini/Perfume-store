import "../../../styles/rootStyle.css";
import { useEffect } from "react";
import "./HomeStyle.css";
import TopBar from "./TopBar";
import NavbarHome from "../../../components/ForClient/Navbar";
import Hero from "./Hero";
import FeaturedProducts from "./FeaturedProducts";
import Collections from "./Collections";
import Banner from "./Banner";
import BestSellers from "./BestSellers";
import BrandStory from "./BrandStory";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";
import Features from "./Features";
import Footer from "../../../components/ForClient/Footer";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Munaryss | Home</title>
      </Helmet>
      <TopBar />
      <NavbarHome />
      <Hero />
      <FeaturedProducts />
      {/* <Collections /> */}
      <Banner />
      {/* <BestSellers /> */}
      <BrandStory />
      <Testimonials />
      <Newsletter />
      <Features />
      <Footer />
    </>
  );
}
