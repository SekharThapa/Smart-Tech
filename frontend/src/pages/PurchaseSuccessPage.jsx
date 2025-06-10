import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const PurchaseSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionId = new URLSearchParams(location.search).get("session_id");

  const clearCart = useCartStore((state) => state.clearCart);

  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const handleCheckoutSuccess = async () => {
      if (!sessionId) {
        console.error("Missing session ID in URL");
        setStatus("error");
        return;
      }

      try {
        const res = await axios.post("/payments/checkout-success", {
          sessionId,
        });

        if (res.data.success) {
          setOrderId(res.data.orderId);
          setStatus("success");

          clearCart();
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error(
          "Checkout success error:",
          error.response?.data || error.message
        );
        setStatus("error");
      }
    };

    handleCheckoutSuccess();
  }, [sessionId, clearCart]);

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-gray-800 space-y-6 text-center">
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-emerald-400" />
            <p className="text-xl font-medium">Verifying your payment...</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
            <h2 className="text-2xl font-bold">Payment Successful!</h2>
            <p className="text-sm text-gray-400">
              Thank you for your purchase. Your order ID is:
            </p>
            <p className="text-md font-mono text-emerald-300">{orderId}</p>
            <button
              onClick={handleContinueShopping}
              className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-md text-sm font-medium text-white">
              Continue Shopping
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="mx-auto h-12 w-12 text-red-500" />
            <h2 className="text-2xl font-bold">Payment Failed</h2>
            <p className="text-sm text-gray-400">
              Something went wrong. Please contact support if you've been
              charged.
            </p>
            <button
              onClick={handleContinueShopping}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium text-white">
              Go Back Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;
