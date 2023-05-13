const { getAllGains, createGain, getGain } = require("../controllers/gain");

const router = require("express").Router();

// @desc Get all gains
// @route GET /api/{version}/gains
// public
router.get("/", getAllGains);

// @desc Create a sale
// @route POST /api/{version}/gains
// public
router.post("/", createGain);

// @desc Get a sale
// @route GET /api/{version}/gains/:id
// public
router.get("/:id", getGain);

module.exports = router;
