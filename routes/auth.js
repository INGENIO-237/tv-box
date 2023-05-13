const { registerUser, loginUser, currentUser } = require("../controllers/auth");

const router = require("express").Router();

// @desc Register a new user
// route POST /api/{version}/account/register
// public
router.post("/register", registerUser);

// @desc Login user
// route POST /api/{version}/account/login
// public
router.post("/login", loginUser);

// @desc Get current user info
// route GET /api/{version}/account/current
// public
router.get("/current", currentUser);

module.exports = router;
