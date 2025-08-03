const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validate-token");

router.post("/client-payment-intent", validateToken, async (req, resp) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount * 100,
      currency: "usd",
      description: "Shiveven-mern stack project",
    });

    return resp.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
});

module.exports = router;
