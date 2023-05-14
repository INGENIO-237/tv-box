const {
  getAllPaymentsHandler,
  createPaymentHandler,
  getPaymentHandler,
  updatePaymentHandler,
  deletePaymentHandler,
} = require("../controllers/payment");

const router = require("express").Router();

// @desc Get all payments
// @route GET /api/{version}/payments
// public
router.get("/", getAllPaymentsHandler);

// @desc Create a sale
// @route POST /api/{version}/payments
// public
router.post("/", createPaymentHandler);

// @desc Get a sale
// @route GET /api/{version}/payments/:id
// public
router.get("/:id", getPaymentHandler);

// @desc Update a sale
// @route PUT /api/{version}/payments/:id
// public
router.put("/:id", updatePaymentHandler);

// @desc Delete a sale
// @route DELETE /api/{version}/payments/:id
// public
router.delete("/:id", deletePaymentHandler);

module.exports = router;
