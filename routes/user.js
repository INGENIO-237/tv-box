const {
  getAllUsers,
  getUser,
  getUsersByRole,
  updateUser,
  deleteUser,
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
router.get("/:id", updateUser);

// @desc Delete single user
// route DELETE /api/{version}/users/:id
// public
router.get("/:id", deleteUser);

module.exports = router;
