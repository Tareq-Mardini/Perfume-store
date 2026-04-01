import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/PagesForClient/Home/HomePage";
import AdminLogin from "./pages/PagesForAdmin/Login/LoginPage";
import ProductPage from "./pages/PagesForClient/Products/ProductsPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produts" element={<ProductPage />} />
          <Route path="/Login-Admin" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
