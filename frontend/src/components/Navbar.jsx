import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md border-b border-gray-200 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-3 flex flex-wrap justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center space-x-2 select-none cursor-pointer"
          aria-label="SmartTech Home">
          <h1
            className="text-4xl font-extrabold"
            style={{
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}>
            <span className="text-emerald-600 drop-shadow-sm transition-colors duration-300 hover:text-emerald-500">
              Smart
            </span>
            <span className="text-blue-600 drop-shadow-sm transition-colors duration-300 hover:text-blue-500">
              Tech
            </span>
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center gap-6">
          <Link
            to="/"
            className="text-gray-800 hover:text-emerald-600 transition duration-300 font-semibold">
            Home
          </Link>

          {user && (
            <Link
              to="/cart"
              className="relative group text-gray-800 hover:text-emerald-600 transition duration-300 flex items-center"
              aria-label="View Cart">
              <ShoppingCart size={20} className="mr-1" />
              <span className="hidden sm:inline font-semibold">Cart</span>
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
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-md font-semibold flex items-center shadow-sm transition duration-300">
              <Lock size={18} className="mr-1" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}

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
