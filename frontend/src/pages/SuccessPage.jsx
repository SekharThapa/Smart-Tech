import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  useEffect(() => {
    const sendSuccessEmail = async () => {
      try {
        // Example payload – customize as needed
        await axios.get("/payments/success", {
          to: "thapasekhar2060.com", // Ideally fetch from auth or user context
          subject: "🧾 Your SmartTech Payment Was Successful",
          html: `
            <h2>Payment Confirmation</h2>
            <p>Thank you for shopping with SmartTech. Your payment has been received successfully.</p>
            <p>We will process and dispatch your order shortly.</p>
          `,
        });
        console.log("✅ Email triggered from frontend");
      } catch (err) {
        console.error(
          "❌ Error sending success email from frontend",
          err.message
        );
      }
    };

    sendSuccessEmail();
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
