import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  useEffect(() => {
    const hitSuccessRoute = async () => {
      try {
        await axios.get("/payments/success"); // 🔥 hits your backend route
        console.log("✅ Backend success route hit");
      } catch (err) {
        console.error("❌ Error hitting success route:", err.message);
      }
    };

    hitSuccessRoute(); // ✅ Automatically called on page load
  }, []);

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4">Thank you for your purchase.</p>
      <Link
        to="/"
        className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded">
        Return Home
      </Link>
    </div>
  );
};

export default SuccessPage;
