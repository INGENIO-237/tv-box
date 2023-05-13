const {
  getAllUsers,
  getUser,
  getUsersByRole,
  updateUser,
  deleteUser,
  getUserGains,
} = require("../controllers/user");

const router = require("express").Router();

// @desc Get all users
// route GET /api/{version}/users/
// public
router.get("/", getAllUsers);

// @desc Get single user
// route GET /api/{version}/users/:id
// public
router.get("/:id", getUser);

// @desc Get users by role
// route GET /api/{version}/users/:role
// public
router.get("/:role", getUsersByRole);

// @desc Update single user
// route PUT /api/{version}/users/:id
// public
router.put("/:id", updateUser);

// @desc Delete single user
// route DELETE /api/{version}/users/:id
// public
router.delete("/:id", deleteUser);

// @desc Get all gains of a user
// route GET /api/{version}/users/:id/gains
// public
router.get("/:id/gains", getUserGains);

module.exports = router;
