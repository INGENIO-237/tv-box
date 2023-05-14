const { getAllGainsHandler, createGainHandler, getGainHandler } = require("../controllers/gain");

const router = require("express").Router();

// @desc Get all gains
// @route GET /api/{version}/gains
// public
router.get("/", getAllGainsHandler);

// @desc Create a sale
// @route POST /api/{version}/gains
// public
router.post("/", createGainHandler);

// @desc Get a sale
// @route GET /api/{version}/gains/:id
// public
router.get("/:id", getGainHandler);

module.exports = router;
