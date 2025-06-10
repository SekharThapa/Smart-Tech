// routes/Khalti.routes.js
import express from "express";
import {
  initializeKhaltiPayment,
  verifyKhaltiPayment,
} from "../controllers/khalti.controller.js";

const router = express.Router();

router.post("/initiate", initializeKhaltiPayment);
router.post("/verify", verifyKhaltiPayment);

export default router;
