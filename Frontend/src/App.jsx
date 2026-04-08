import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/PagesForClient/Home/HomePage";
import AdminLogin from "./pages/PagesForAdmin/Login/LoginPage";
import ProductPage from "./pages/PagesForClient/Products/ProductsPage";
import SpecificProductPage from "./pages/PagesForClient/SpecificProduct/SpecificProductPage";
import { Checkout } from "./pages/PagesForClient/Checkout/Checkout";
import { CartProvider } from "./Context/CartProvider";
function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:id" element={<SpecificProductPage />} />
            <Route path="/products/Checkout" element={<Checkout />} />

            <Route path="/Login-Admin" element={<AdminLogin />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
