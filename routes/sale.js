const {
  createSaleHandler,
  updateSaleHandler,
  deleteSaleHandler,
} = require("../controllers/sale");

const accessVerification = require("../middlewares/tokenVerification");

const router = require("express").Router();

// Access token verification middleware
router.use(accessVerification);

// @desc Create a sale
// @route POST /api/{version}/sales
// private
router.post("/", createSaleHandler);

// @desc Update a sale
// @route PUT /api/{version}/sales/
// We pass the id_cmd and id_art via the request body
// private
router.put("/", updateSaleHandler);

// @desc Delete a sale
// @route DELETE /api/{version}/sales/
// We pass the id_cmd and id_art via the request body
// private
router.delete("/", deleteSaleHandler);

module.exports = router;
