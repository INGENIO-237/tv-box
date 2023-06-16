const {
  createPaymentHandler,
  getStripePaymentConfigurationHandler,
  getAllPayments,
  getSinglePaymentHandler,
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
router.get("/config", getStripePaymentConfigurationHandler);

// @desc Get single payment
// @route GET /api/{version}/payments/:id
// private
router.get("/:id", getSinglePaymentHandler);

module.exports = router;
