import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  checkoutSuccess,
  createCheckoutSession,
  initiateEsewaPayment,
  esewaSuccessHandler,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/checkout-success", protectRoute, checkoutSuccess);
router.post("/initiate-payment", initiateEsewaPayment);

// ✅ Add this new GET route
router.get("/success", esewaSuccessHandler);

export default router;
