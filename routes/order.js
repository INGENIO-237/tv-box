const {
  getAllOrdersHandler,
  createOrderHandler,
  getOrderHandler,
  updateOrderHandler,
  deleteOrderHandler,
} = require("../controllers/order");

const router = require("express").Router();

// @desc Get all orders
// @route GET /api/{version}/orders
// public
router.get("/", getAllOrdersHandler);

// @desc Create a sale
// @route POST /api/{version}/orders
// public
router.post("/", createOrderHandler);

// @desc Get a sale
// @route GET /api/{version}/orders/:id
// public
router.get("/:id", getOrderHandler);

// @desc Update a sale
// @route PUT /api/{version}/orders/:id
// public
router.put("/:id", updateOrderHandler);

// @desc Delete a sale
// @route DELETE /api/{version}/orders/:id
// public
router.delete("/:id", deleteOrderHandler);

module.exports = router;
