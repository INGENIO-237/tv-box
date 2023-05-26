const {
  registerUserHandler,
  loginUserHandler,
  currentUserHandler,
  updateCredentialsHandler,
  passwordResetRequestHandler,
  passwordResetHandler,
  logoutUserHandler,
} = require("../controllers/auth");

const accessVerification = require("../middlewares/tokenVerification");

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
// private
router.get("/current", accessVerification, currentUserHandler);

// @desc Logout user
// route POST /api/{version}/account/logout
// private
router.post("/logout", accessVerification, logoutUserHandler);

// @desc Update user credentials
// route POST /api/{version}/account/update-credentials
// private
router.put("/update-credentials", accessVerification, updateCredentialsHandler);

// @desc Request for a password reset
// route POST /api/{version}/account/forgot-password
// public
router.post("/forgot-password", passwordResetRequestHandler);

// @desc Reset user password
// route POST /api/{version}/account/password-reset/:token
// public
router.post("/password-reset/:token", passwordResetHandler);

module.exports = router;
