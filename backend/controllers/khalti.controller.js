// controllers/khalti.controller.js
import axios from "axios";

const KHALTI_SECRET_KEY = "a538f5ab311e4d778833e9c3362cda77";
const KHALTI_GATEWAY_URL = "https://a.khalti.com/api/v2/epayment";

export const initializeKhaltiPayment = async (req, res) => {
  try {
    const {
      return_url,
      website_url,
      amount,
      purchase_order_id,
      purchase_order_name,
    } = req.body;

    const response = await axios.post(
      `${KHALTI_GATEWAY_URL}/initiate/`,
      {
        return_url,
        website_url,
        amount,
        purchase_order_id,
        purchase_order_name,
      },
      {
        headers: {
          Authorization: `Key ${KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Khalti initiate error:", error?.response?.data || error);
    res.status(500).json({ error: error?.response?.data || "Server Error" });
  }
};

export const verifyKhaltiPayment = async (req, res) => {
  try {
    const { pidx } = req.body;

    const response = await axios.post(
      `${KHALTI_GATEWAY_URL}/lookup/`,
      { pidx },
      {
        headers: {
          Authorization: `Key ${KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Khalti verify error:", error?.response?.data || error);
    res.status(500).json({ error: error?.response?.data || "Server Error" });
  }
};
