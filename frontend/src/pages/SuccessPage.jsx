import React from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
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
