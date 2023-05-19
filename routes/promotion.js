const {
  getAllPromotionsHandler,
  createPromotionHandler,
  getPromotionByUserIdHandler,
  updatePromotionByUserIdHandler,
  deletePromotionByUserIdHandler,
} = require("../controllers/promotion");

const accessVerification = require("../middlewares/tokenVerification");

const router = require("express").Router();

// acess token verification middleware
router.use(accessVerification);

// @desc Get all promotions
// @route GET /api/{version}/promotions
// private
router.get("/", getAllPromotionsHandler);

// @desc Create a promotion
// @route POST /api/{version}/promotions
// private
router.post("/", createPromotionHandler);

// @desc Get a user's promotion
// @route GET /api/{version}/promotions/:id_usr
// private
router.get("/:id_usr", getPromotionByUserIdHandler);

// @desc Update a user's promotion
// @route PUT /api/{version}/promotions/:id_usr
// private
router.put("/:id_usr", updatePromotionByUserIdHandler);

// @desc Delete a user's promotion
// @route DELETE /api/{version}/promotions/:id_usr
// private
router.delete("/:id_usr", deletePromotionByUserIdHandler);

module.exports = router;
