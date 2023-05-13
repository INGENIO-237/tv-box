const {
  getAllPromotions,
  createPromotion,
  getPromotion,
  updatePromotion,
  deletePromotion,
} = require("../controllers/promotion");

const router = require("express").Router();

// @desc Get all promotions
// @route GET /api/{version}/promotions
// public
router.get("/", getAllPromotions);

// @desc Create a promotion
// @route POST /api/{version}/promotions
// public
router.post("/", createPromotion);

// @desc Get a promotion
// @route GET /api/{version}/promotions/:id
// public
router.get("/:id", getPromotion);

// @desc Update a promotion
// @route PUT /api/{version}/promotions/:id
// public
router.put("/:id", updatePromotion);

// @desc Delete a promotion
// @route DELETE /api/{version}/promotions/:id
// public
router.delete("/:id", deletePromotion);

module.exports = router;
