import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Navbar from "./Components/Navbar";
import RegisterPage from "./Pages/RegisterPage";
import AuthProvider from "./Context/Auth/AuthProvider";
import LoginPage from "./Pages/LoginPage";
import CartPage from "./Pages/CartPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import CartProvider from "./Context/Cart/CartProvider";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<CartPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
