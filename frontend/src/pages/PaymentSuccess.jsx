import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const pidx = searchParams.get("pidx");
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/khalti/verify",
          {
            pidx,
          }
        );

        setPaymentData(response.data);
      } catch (err) {
        setError("Payment verification failed.");
      } finally {
        setLoading(false);
      }
    };

    if (pidx) verifyPayment();
  }, [pidx]);

  if (loading) return <div className="p-6">Verifying payment...</div>;

  if (error)
    return (
      <div className="p-6 text-red-600 text-lg font-semibold">❌ {error}</div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          ✅ Payment Successful!
        </h2>
        <p className="text-gray-700 mb-2">
          Order ID:{" "}
          <span className="font-semibold">
            {paymentData?.purchase_order_id}
          </span>
        </p>
        <p className="text-gray-700 mb-2">
          Amount Paid:{" "}
          <span className="font-semibold">
            Rs {(paymentData?.amount / 100).toFixed(2)}
          </span>
        </p>
        <p className="text-gray-700 mb-4">Thank you for your payment!</p>
        <a
          href="/"
          className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
