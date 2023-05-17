const {
  getAllUsersHandler,
  getUserHandler,
  getUsersByRoleHandler,
  updateUserHandler,
  deleteUserHandler,
  getUserGainsHandler,
} = require("../controllers/user");

const router = require("express").Router();

// @desc Get all users
// route GET /api/{version}/users/
// public
router.get("/", getAllUsersHandler);

// @desc Get single user
// route GET /api/{version}/users/:id
// public
router.get("/:id", getUserHandler);

// @desc Get users by role
// route GET /api/{version}/users/:role
// public
router.get("/roles/:role", getUsersByRoleHandler);

// @desc Update single user
// route PUT /api/{version}/users/:id
// public
router.put("/:id", updateUserHandler);

// @desc Delete single user
// route DELETE /api/{version}/users/:id
// public
router.delete("/:id", deleteUserHandler);

// @desc Get all gains of a user
// route GET /api/{version}/users/:id/gains
// public
router.get("/:id/gains", getUserGainsHandler);

module.exports = router;
