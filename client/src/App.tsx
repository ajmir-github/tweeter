import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import CartPage from "./routes/cart";
import HomePage from "./routes/home";
import LoginPage from "./routes/login";
import NotFoundPage from "./routes/notFoundPage";
import ProductPage from "./routes/product";
import ProductsPage from "./routes/products";
import RegisterPage from "./routes/register";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="profile" element={<CartPage />} />
        <Route path="notification" element={<ProductsPage />} />
        <Route path="hashtag" element={<ProductPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
