// App.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import EsewaForm from "./pages/EsewaForm";
import KhaltiInitiate from "./pages/KhaltiInitiate";
import PaymentSuccess from "./pages/PaymentSuccess";
import SuccessPage from "./pages/SuccessPage";
import Failure from "./pages/Failure";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) getCartItems();
  }, [getCartItems, user]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={!user ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/secret-dashboard"
            element={
              user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />
            }
          />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route
            path="/cart"
            element={user ? <CartPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/success"
            element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/cancel"
            element={user ? <PurchaseCancelPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/esewa-form"
            element={user ? <EsewaForm /> : <Navigate to="/login" />}
          />
          <Route path="/payment/success" element={<SuccessPage />} />
          <Route path="payment/fail" element={<Failure />} />

          <Route path="/khalti" element={<KhaltiInitiate />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
}

export default App;
