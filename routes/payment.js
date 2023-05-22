const {
  createPaymentHandler,
  getPaymentHandler,
} = require("../controllers/payment");

const router = require("express").Router();



// @desc Create a sale
// @route POST /api/{version}/payments
// private
router.post("/", createPaymentHandler);

module.exports = router;
