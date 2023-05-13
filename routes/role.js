const {
  getAllRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/role");

const router = require("express").Router();

// @desc Get all roles
// @route GET /api/{version}/roles
// public
router.get("/", getAllRoles);

// @desc Create a role
// @route POST /api/{version}/roles
// public
router.post("/", createRole);

// @desc Get a role
// @route GET /api/{version}/roles/:id
// public
router.get("/:id", getRole);

// @desc Update a role
// @route PUT /api/{version}/roles/:id
// public
router.put("/:id", updateRole);

// @desc Delete a role
// @route DELETE /api/{version}/roles/:id
// public
router.delete("/:id", deleteRole);

module.exports = router;
