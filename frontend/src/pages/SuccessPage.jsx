import React from "react";
import axios from "axios";

const SuccessPage = () => {
  const hitSuccessRoute = async () => {
    try {
      await axios.get("/payments/success");
      console.log("✅ Backend success route hit");
    } catch (err) {
      console.error("❌ Error hitting success route:", err.message);
    }
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4">Thank you for your purchase.</p>

      <button
        onClick={hitSuccessRoute}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition">
        Confirm Payment
      </button>
    </div>
  );
};

export default SuccessPage;
