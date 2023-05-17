const {
  createSaleHandler,
  updateSaleHandler,
  deleteSaleHandler,
} = require("../controllers/sale");

const router = require("express").Router();

// @desc Create a sale
// @route POST /api/{version}/sales
// public
router.post("/", createSaleHandler);

// @desc Update a sale
// @route PUT /api/{version}/sales/
// We pass the id_cmd and id_art via the request body
// public
router.put("/", updateSaleHandler);

// @desc Delete a sale
// @route DELETE /api/{version}/sales/
// We pass the id_cmd and id_art via the request body
// public
router.delete("/", deleteSaleHandler);

module.exports = router;
