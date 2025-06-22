import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  Sun,
  Moon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = ({ darkMode, setDarkMode }) => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-3 flex flex-wrap justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 select-none cursor-pointer"
          aria-label="SmartTech Home">
          <img
            src="/logo.png"
            alt="SmartTech Logo"
            className="h-10 w-10 rounded-2xl"
          />
          <h1 className="text-4xl font-extrabold font-sans">
            <span className="text-emerald-600 dark:text-emerald-400">
              Smart
            </span>
            <span className="text-blue-600 dark:text-blue-400">Tech</span>
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center gap-4">
          <Link
            to="/"
            className="text-gray-800 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold transition">
            Home
          </Link>

          {user && (
            <Link
              to="/cart"
              className="relative group text-gray-800 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold transition flex items-center"
              aria-label="View Cart">
              <ShoppingCart size={20} className="mr-1" />
              <span className="hidden sm:inline">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -left-3 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs font-bold animate-pulse shadow-lg">
                  {cart.length}
                </span>
              )}
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/secret-dashboard"
              className="bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-gray-900 px-3 py-1 rounded-md font-semibold flex items-center shadow-sm transition duration-300">
              <Lock size={18} className="mr-1" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-gray-800 dark:text-white hover:text-yellow-500 dark:hover:text-yellow-300 p-2 rounded-md transition"
            aria-label="Toggle Theme">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Auth Buttons */}
          {user ? (
            <button
              onClick={logout}
              className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md flex items-center font-semibold shadow-sm transition duration-300"
              aria-label="Log Out">
              <LogOut size={18} />
              <span className="hidden sm:inline ml-2">Log Out</span>
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center font-semibold shadow-sm transition duration-300">
                <UserPlus size={18} className="mr-2" />
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md flex items-center font-semibold shadow-sm transition duration-300">
                <LogIn size={18} className="mr-2" />
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
