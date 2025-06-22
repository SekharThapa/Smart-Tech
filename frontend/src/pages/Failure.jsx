import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

const Failure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl text-center">
        <XCircle className="text-red-500 mx-auto mb-4" size={64} />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Something went wrong. Your eSewa payment did not go through.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition">
          Return to Homepage
        </button>
      </div>
    </div>
  );
};

export default Failure;
