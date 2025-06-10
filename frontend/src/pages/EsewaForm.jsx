import React, { useState } from "react";
import axios from "axios";

const EsewaForm = () => {
  const [transactionUUID] = useState(Date.now().toString());
  const [formData, setFormData] = useState(null);

  const handlePay = async () => {
    try {
      const payload = {
        amount: 100,
        tax_amount: 10,
        total_amount: 110,
        transaction_uuid: transactionUUID,
      };

      const res = await axios.post(
        "http://localhost:5000/api/payments/initiate-payment",
        payload
      );

      setFormData(res.data.formData);

      setTimeout(() => {
        const form = document.getElementById("esewaForm");
        form?.submit();
      }, 500);
    } catch (error) {
      console.error("Payment initiation failed", error);
    }
  };

  return (
    <>
      <button
        onClick={handlePay}
        className="bg-green-500 p-2 text-white rounded"
        type="button">
        Pay with eSewa
      </button>

      {formData && (
        <form
          id="esewaForm"
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          method="POST"
          style={{ display: "none" }}>
          {Object.entries(formData).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={String(value)} />
          ))}

          {/* Explicitly add or override success and failure URLs */}
          <input
            type="hidden"
            name="success_url"
            value="http://localhost:5173/payment/success"
          />
          <input
            type="hidden"
            name="failure_url"
            value="http://localhost:5173/payment/failure"
          />
        </form>
      )}
    </>
  );
};

export default EsewaForm;
