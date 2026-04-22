import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/PagesForClient/Home/HomePage";
import AdminLogin from "./pages/PagesForAdmin/Login/LoginPage";
import ProductPage from "./pages/PagesForClient/Products/ProductsPage";
import SpecificProductPage from "./pages/PagesForClient/SpecificProduct/SpecificProductPage";
import { Checkout } from "./pages/PagesForClient/Checkout/Checkout";
import { CartProvider } from "./Context/CartProvider";
import Terms from "./pages/PagesForClient/Terms/Terms";
import AboutUs from "./pages/PagesForClient/AboutUS/AboutUs";
import DashboardLayout from "./layouts/DashboardLayout";
import Products from "./pages/PagesForAdmin/Dashboard/ManageProducts/DisplayProducts/Products";
import DisplayDetailProduct from "./pages/PagesForAdmin/Dashboard/ManageProducts/DisplayDetailProduct/DisplayDetailProduct";
import CreateProduct from "./pages/PagesForAdmin/Dashboard/ManageProducts/CreateProduct/CreateProduct";
import ManageOrders from "./pages/PagesForAdmin/Dashboard/ManageOrders/ManageOrders";
function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            {/* routes to client */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:id" element={<SpecificProductPage />} />
            <Route path="/products/Checkout" element={<Checkout />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<AboutUs />} />
            {/* routes to admin */}
            <Route element={<DashboardLayout />}>
              <Route path="/admin/products" element={<Products />} />
              <Route
                path="/admin/products/product-Detail/:id"
                element={<DisplayDetailProduct />}
              />
              <Route
                path="/admin/products/create-product"
                element={<CreateProduct />}
              />
              <Route path="/admin/orders" element={<ManageOrders />} />
            </Route>
            <Route path="/Login-Admin" element={<AdminLogin />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
