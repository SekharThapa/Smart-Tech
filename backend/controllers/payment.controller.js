import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import { stripe } from "../lib/stripe.js";
import { generateEsewaSignature } from "../utils/methods.js";
import { sendSuccessEmail } from "../utils/sendMail.js";
import dotenv from "dotenv";

dotenv.config();
export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;
    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100);
      totalAmount += amount * product.quantity;
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });
      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      discounts: coupon
        ? [{ coupon: await createStripeCoupon(coupon.discountPercentage) }]
        : [],
      metadata: {
        userId: req.user._id.toString(),
        couponCode: couponCode || "",
        products: JSON.stringify(
          products.map((p) => ({
            id: p._id,
            quantity: p.quantity,
            price: p.price,
          }))
        ),
      },
    });

    if (totalAmount >= 20000) await createNewCoupon(req.user._id);

    res.status(200).json({ id: session.id, url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ message: "Checkout failed", error: error.message });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed." });
    }

    // Atomic find or create order to avoid duplicates
    const existingOrNewOrder = await Order.findOneAndUpdate(
      { stripeSessionId: sessionId },
      {
        $setOnInsert: {
          user: session.metadata.userId,
          products: JSON.parse(session.metadata.products).map((p) => ({
            product: p.id,
            quantity: p.quantity,
            price: p.price,
          })),
          totalAmount: session.amount_total / 100,
          stripeSessionId: sessionId,
        },
      },
      { upsert: true, new: true }
    );

    // Deactivate coupon if used
    if (session.metadata.couponCode) {
      await Coupon.findOneAndUpdate(
        {
          code: session.metadata.couponCode,
          userId: session.metadata.userId,
        },
        { isActive: false }
      );
    }

    res.status(200).json({ success: true, orderId: existingOrNewOrder._id });
  } catch (error) {
    console.error("Checkout success error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const createStripeCoupon = async (discountPercentage) => {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });
  return coupon.id;
};

const createNewCoupon = async (userId) => {
  await Coupon.findOneAndDelete({ userId });
  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    userId,
  });
  await newCoupon.save();
};

export const initiateEsewaPayment = async (req, res) => {
  try {
    const {
      amount,
      tax_amount,
      total_amount,
      transaction_uuid,
      product_service_charge = 0,
      product_delivery_charge = 0,
    } = req.body;

    const fieldsToSign = {
      total_amount,
      transaction_uuid,
      product_code: process.env.ESEWA_MERCHANT_CODE,
    };

    const { signature, signedFields } = generateEsewaSignature(
      fieldsToSign,
      process.env.ESEWA_SECRET_KEY
    );

    const formData = {
      amount,
      tax_amount,
      total_amount,
      transaction_uuid,
      product_code: process.env.ESEWA_MERCHANT_CODE,
      product_service_charge,
      product_delivery_charge,
      success_url: process.env.ESEWA_SUCCESS_URL,
      failure_url: process.env.ESEWA_FAILURE_URL,
      signed_field_names: signedFields,
      signature,
    };

    res.json({ formData });
  } catch (error) {
    res.status(500).json({ message: "Error initiating eSewa payment", error });
  }
};

export const esewaSuccessHandler = async (req, res) => {
  try {
    const { transaction_uuid, reference_id, total_amount } = req.query;

    // Optional: verify payment on your backend with eSewa

    // Send email to user (for now, we'll use static email, later you can use user's email from db/order)
    await sendSuccessEmail({
      to: "thapasekhar2060@gmail.com",
      subject: "🧾 SmartTech Payment Successful",
      html: `
        <h2>Thank you for your order!</h2>
        <p>Your payment of NPR <strong>${total_amount}</strong> was successful.</p>
        <p>Transaction ID: <strong>${transaction_uuid}</strong></p>
        <p>Reference ID: <strong>${reference_id}</strong></p>
        <p>We'll process and ship your order soon.</p>
      `,
    });

    // Redirect or show success message
    res.redirect("http://localhost:5173/success"); // or your frontend success page
  } catch (error) {
    console.error("eSewa Success Handler Error:", error.message);
    res.status(500).send("Error processing eSewa success.");
  }
};
