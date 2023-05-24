const {
  createPaymentHandler,
  getStripePaymentConfigurationHandler,
} = require("../controllers/payment");

const router = require("express").Router();

// @desc Create a payment
// @route POST /api/{version}/payments
// public
router.post("/", createPaymentHandler);

// @desc Get stripe payment configuration
// @route GET /api/{version}/payments/config
// public
router.get('/config', getStripePaymentConfigurationHandler)

module.exports = router;
