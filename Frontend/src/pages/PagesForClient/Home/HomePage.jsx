import "../../../styles/rootStyle.css";
import "./HomeStyle.css";
import TopBar from "./TopBar";
import NavbarHome from "../../../components/ForClient/NavbarHome";
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
export default function HomePage() {
  return (
    <>
      <TopBar />
      <NavbarHome />
      <Hero />
      <FeaturedProducts />
      <Collections />
      <Banner />
      <BestSellers />
      <BrandStory />
      <Testimonials />
      <Newsletter />
      <Features />
      <Footer />
    </>
  );
}
