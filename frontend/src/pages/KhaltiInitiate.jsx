import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KhaltiInitiate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/khalti/initiate",
        {
          return_url: "http://localhost:5173/payment-success",
          website_url: "http://localhost:5173",
          amount: 1000, // in paisa (10.00 NPR)
          purchase_order_id: "order_123",
          purchase_order_name: "Test Product",
        }
      );

      const { payment_url } = response.data;

      window.location.href = payment_url; // Redirect to Khalti payment page
    } catch (error) {
      console.error("Khalti initiate error:", error?.response?.data || error);
      alert("Failed to initiate Khalti payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Pay with Khalti</h2>
      <button
        onClick={startPayment}
        className="px-4 py-2 bg-purple-600 text-white rounded"
        disabled={loading}>
        {loading ? "Redirecting..." : "Pay Now"}
      </button>
    </div>
  );
};

export default KhaltiInitiate;
