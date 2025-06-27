import React, { useEffect } from "react";
import axios from "axios";

const SuccessPage = () => {
  useEffect(() => {
    const hitSuccessRoute = async () => {
      try {
        await axios.get("/payments/success");
        console.log("✅ Backend success route hit");
      } catch (err) {
        console.error("❌ Error hitting success route:", err.message);
      }
    };

    hitSuccessRoute(); // Call on render
  }, []);

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4">Thank you for your purchase.</p>
    </div>
  );
};

export default SuccessPage;
