const {
  getAllGainsHandler,
  createGainHandler,
  getGainHandler,
} = require("../controllers/gain");

const accessVerification = require("../middlewares/tokenVerification");

const router = require("express").Router();

// acess token verification middleware
router.use(accessVerification);

// @desc Get all gains
// @route GET /api/{version}/gains
// private
router.get("/", getAllGainsHandler);

// @desc Create a sale
// @route POST /api/{version}/gains
// private
router.post("/", createGainHandler);

// @desc Get a sale
// @route GET /api/{version}/gains/:id
// private
router.get("/:id", getGainHandler);

module.exports = router;
