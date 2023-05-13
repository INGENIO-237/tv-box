const router = require("express").Router();

// @desc Get all payments
// @route GET /api/{version}/payments
// public
router.get("/", getAllPayments);

// @desc Create a sale
// @route POST /api/{version}/payments
// public
router.post("/", createPayment);

// @desc Get a sale
// @route GET /api/{version}/payments/:id
// public
router.get("/:id", getPayment);

// @desc Update a sale
// @route PUT /api/{version}/payments/:id
// public
router.put("/:id", updatePayment);

// @desc Delete a sale
// @route DELETE /api/{version}/payments/:id
// public
router.delete("/:id", deletePayment);

module.exports = router;
