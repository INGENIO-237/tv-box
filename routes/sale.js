const {
  getAllSales,
  createSale,
  getSale,
  updateSale,
  deleteSale,
} = require("../controllers/sale");

const router = require("express").Router();

// @desc Get all sales
// @route GET /api/{version}/sales
// public
router.get("/", getAllSales);

// @desc Create a sale
// @route POST /api/{version}/sales
// public
router.post("/", createSale);

// @desc Get a sale
// @route GET /api/{version}/sales/:id
// public
router.get("/:id", getSale);

// @desc Update a sale
// @route PUT /api/{version}/sales/:id
// public
router.put("/:id", updateSale);

// @desc Delete a sale
// @route DELETE /api/{version}/sales/:id
// public
router.delete("/:id", deleteSale);

module.exports = router;
