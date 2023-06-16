const {
  getAllPromotionsHandler,
  createPromotionHandler,
  getPromotionByUserIdHandler,
  updatePromotionByUserIdHandler,
  deletePromotionByUserIdHandler,
  regeneratePromotionCodeHandler,
  getPromotionDetailsByCodeHandler,
} = require("../controllers/promotion");

const accessVerification = require("../middlewares/tokenVerification");

const router = require("express").Router();

// @desc Get all promotions
// @route GET /api/{version}/promotions
// private
router.get("/", accessVerification, getAllPromotionsHandler);

// @desc Create a promotion
// @route POST /api/{version}/promotions
// private
router.post("/", accessVerification, createPromotionHandler);

// @desc Get a user's promotion
// @route GET /api/{version}/promotions/:id_usr
// private
router.get("/:id_usr", accessVerification, getPromotionByUserIdHandler);

// @desc Update a user's promotion
// @route PUT /api/{version}/promotions/:id_usr
// private
router.put("/:id_usr", accessVerification, updatePromotionByUserIdHandler);

// @desc Delete a user's promotion
// @route DELETE /api/{version}/promotions/:id_usr
// private
router.delete("/:id_usr", accessVerification, deletePromotionByUserIdHandler);

// @desc Regenerate a user's promotion code
// @route PUT /api/{version}/promotions/:id_usr/regenerate
// private
router.put(
  "/:id_usr/regenerate",
  accessVerification,
  regeneratePromotionCodeHandler
);

// @desc Get promotion details
// @route GET /api/{version}/promotions/code/:code
// public
router.get("/code/:code", getPromotionDetailsByCodeHandler);

module.exports = router;
