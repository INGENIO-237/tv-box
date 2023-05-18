const {
  registerUserHandler,
  loginUserHandler,
  currentUserHandler,
  updateCredentialsHandler,
} = require("../controllers/auth");

const accessVerification = require("../middlewares/tokenVerification");

const router = require("express").Router();

// @desc Register a new user
// route POST /api/{version}/account/register
// private
router.post("/register", registerUserHandler);

// @desc Login user
// route POST /api/{version}/account/login
// private
router.post("/login", loginUserHandler);

// @desc Get current user info
// route GET /api/{version}/account/current
// private
router.get("/current", accessVerification, currentUserHandler);

// @desc Update user credentials
// route POST /api/{version}/account/update-credentials
// private
router.put("/update-credentials", accessVerification, updateCredentialsHandler);

module.exports = router;
