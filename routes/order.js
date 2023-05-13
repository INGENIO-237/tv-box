const { getAllOrders, createOrder, getOrder, updateOrder, deleteOrder } = require("../controllers/order");

const router = require("express").Router();

// @desc Get all orders
// @route GET /api/{version}/orders
// public
router.get("/", getAllOrders);

// @desc Create a sale
// @route POST /api/{version}/orders
// public
router.post("/", createOrder);

// @desc Get a sale
// @route GET /api/{version}/orders/:id
// public
router.get("/:id", getOrder);

// @desc Update a sale
// @route PUT /api/{version}/orders/:id
// public
router.put("/:id", updateOrder);

// @desc Delete a sale
// @route DELETE /api/{version}/orders/:id
// public
router.delete("/:id", deleteOrder);

module.exports = router;
