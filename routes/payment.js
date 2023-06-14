const {
  createPaymentHandler,
  getStripePaymentConfigurationHandler,
  getAllPayments,
} = require("../controllers/payment");
const accessVerification = require("../middlewares/tokenVerification");

const router = require("express").Router();

// @desc Get all payments
// @route GET /api/{version}/payments
// private
router.get("/", accessVerification, getAllPayments);

// @desc Create a payment
// @route POST /api/{version}/payments
// public
router.post("/", createPaymentHandler);

// @desc Get stripe payment configuration
// @route GET /api/{version}/payments/config
// public
router.get('/config', getStripePaymentConfigurationHandler)

module.exports = router;
