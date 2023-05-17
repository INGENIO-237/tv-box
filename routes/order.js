const {
  getAllOrdersHandler,
  createOrderHandler,
  getOrderHandler,
  updateOrderHandler,
  deleteOrderHandler,
  changeOrderStatusHandler,
  getOrderSalesHandler,
} = require("../controllers/order");

const router = require("express").Router();

// @desc Get all orders
// @route GET /api/{version}/orders
// public
router.get("/", getAllOrdersHandler);

// @desc Create an order
// @route POST /api/{version}/orders
// public
router.post("/", createOrderHandler);

// @desc Get an order
// @route GET /api/{version}/orders/:id
// public
router.get("/:id", getOrderHandler);

// @desc Update an order
// @route PUT /api/{version}/orders/:id
// public
router.put("/:id", updateOrderHandler);

// @desc Delete an order
// @route DELETE /api/{version}/orders/:id
// public
router.delete("/:id", deleteOrderHandler);

// @desc Change the delivery status of an order
// @route PUT /api/{version}/orders/:id/status
// public
router.put("/:id/status", changeOrderStatusHandler);

// @desc Get all related sales of an order
// @route GET /api/{version}/orders/:id/sales
// public
router.get("/:id/sales", getOrderSalesHandler);

module.exports = router;
