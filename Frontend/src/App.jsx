import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/PagesForClient/Home/HomePage";
import AdminLogin from "./pages/PagesForAdmin/Login/LoginPage";
import ProductPage from "./pages/PagesForClient/Products/ProductsPage";
import SpecificProductPage from "./pages/PagesForClient/SpecificProduct/SpecificProductPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:id" element={<SpecificProductPage />} />
          <Route path="/Login-Admin" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
