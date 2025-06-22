import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { Typewriter } from "react-simple-typewriter";

const categories = [
  { href: "/smartphone", name: "Smartphones", imageUrl: "/mobile.jpg" },
  {
    href: "/laptop",
    name: "Laptops & Computers",
    imageUrl: "/laptopcomputer.jpg",
  },
  {
    href: "/headphone",
    name: "Audio & Headphones",
    imageUrl: "/audioheadphone.png",
  },
  { href: "/homeAppliances", name: "Home Appliances", imageUrl: "/home.jpg" },
  { href: "/wearable", name: "Wearable Technology", imageUrl: "/wearable.jpg" },
  {
    href: "/gaming",
    name: "Gaming Consoles & Accessories",
    imageUrl: "/gaming.png",
  },
  { href: "/camera", name: "Cameras & Photography", imageUrl: "/dslr.jpg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative text-gray-900 bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 scroll-smooth">
      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-3xl">
          <img
            src="logo.png"
            alt="SmartTech Logo"
            className="h-40 inline-block rounded-3xl w-100 animate-float"
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
            <span className="text-blue-700 dark:text-blue-400">Welcome to</span>{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              <Typewriter
                words={["SmartTech", "Latest Gadgets", "Affordable Tech"]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 animate-fadeInUp delay-200">
            Your one-stop shop for the latest gadgets and technology
          </p>
          <a
            href="#categories"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-md shadow-md transition animate-fadeInUp delay-300">
            Shop Now
          </a>
        </div>
      </section>

      {/* Main Content */}
      <main
        id="categories"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-32">
        <h2 className="text-center text-5xl sm:text-6xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 animate-fadeIn">
          Explore Our{" "}
          <span className="text-blue-600 dark:text-blue-400">Categories</span>
        </h2>
        <p className="text-center text-xl text-blue-600 dark:text-blue-400 mb-12 animate-fadeIn delay-200">
          Discover the latest gadgets
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

        {isLoading && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
            Loading featured products...
          </p>
        )}

        {!isLoading && (!products || products.length === 0) && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
            No featured products available.
          </p>
        )}

        {!isLoading && Array.isArray(products) && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}
      </main>
    </div>
  );
};

export default HomePage;
