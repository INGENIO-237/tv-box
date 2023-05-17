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
// private
router.get("/", getAllUsersHandler);

// @desc Get single user
// route GET /api/{version}/users/:id
// private
router.get("/:id", getUserHandler);

// @desc Get users by role
// route GET /api/{version}/users/:role
// private
router.get("/roles/:role", getUsersByRoleHandler);

// @desc Update single user
// route PUT /api/{version}/users/:id
// private
router.put("/:id", updateUserHandler);

// @desc Delete single user
// route DELETE /api/{version}/users/:id
// private
router.delete("/:id", deleteUserHandler);

// @desc Get all gains of a user
// route GET /api/{version}/users/:id/gains
// private
router.get("/:id/gains", getUserGainsHandler);

module.exports = router;
