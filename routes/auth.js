const {
  registerUserHandler,
  loginUserHandler,
  currentUserHandler,
} = require("../controllers/auth");

const router = require("express").Router();

// @desc Register a new user
// route POST /api/{version}/account/register
// public
router.post("/register", registerUserHandler);

// @desc Login user
// route POST /api/{version}/account/login
// public
router.post("/login", loginUserHandler);

// @desc Get current user info
// route GET /api/{version}/account/current
// public
router.get("/current", currentUserHandler);

module.exports = router;
