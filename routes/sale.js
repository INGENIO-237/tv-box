const {
  getAllSalesHandler,
  createSaleHandler,
  getSaleHandler,
  updateSaleHandler,
  deleteSaleHandler,
} = require("../controllers/sale");

const router = require("express").Router();

// @desc Get all sales
// @route GET /api/{version}/sales
// public
router.get("/", getAllSalesHandler);

// @desc Create a sale
// @route POST /api/{version}/sales
// public
router.post("/", createSaleHandler);

// @desc Get a sale
// @route GET /api/{version}/sales/:id
// public
router.get("/:id", getSaleHandler);

// @desc Update a sale
// @route PUT /api/{version}/sales/:id
// public
router.put("/:id", updateSaleHandler);

// @desc Delete a sale
// @route DELETE /api/{version}/sales/:id
// public
router.delete("/:id", deleteSaleHandler);

module.exports = router;
