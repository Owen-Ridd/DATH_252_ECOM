import { Navbar, Footer } from "../../../components";
import HeroSection from "../components/HeroSection";
import ProductListPage from "../../products/pages/ProductListPage";

const HomePage = () => {
  return (
    <>

      
      <HeroSection /> 
      
      <div id="products-section">
          <ProductListPage />
      </div>
      
    </>
  );
};

export default HomePage;