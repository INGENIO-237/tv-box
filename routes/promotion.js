const {
  getAllPromotionsHandler,
  createPromotionHandler,
  getPromotionHandler,
  updatePromotionHandler,
  deletePromotionHandler,
} = require("../controllers/promotion");

const router = require("express").Router();

// @desc Get all promotions
// @route GET /api/{version}/promotions
// public
router.get("/", getAllPromotionsHandler);

// @desc Create a promotion
// @route POST /api/{version}/promotions
// public
router.post("/", createPromotionHandler);

// @desc Get a promotion
// @route GET /api/{version}/promotions/:id
// public
router.get("/:id", getPromotionHandler);

// @desc Update a promotion
// @route PUT /api/{version}/promotions/:id
// public
router.put("/:id", updatePromotionHandler);

// @desc Delete a promotion
// @route DELETE /api/{version}/promotions/:id
// public
router.delete("/:id", deletePromotionHandler);

module.exports = router;
