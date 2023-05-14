const {
  getAllRolesHandler,
  createRoleHandler,
  getRoleHandler,
  updateRoleHandler,
  deleteRoleHandler,
} = require("../controllers/role");

const router = require("express").Router();

// @desc Get all roles
// @route GET /api/{version}/roles
// public
router.get("/", getAllRolesHandler);

// @desc Create a role
// @route POST /api/{version}/roles
// public
router.post("/", createRoleHandler);

// @desc Get a role
// @route GET /api/{version}/roles/:id
// public
router.get("/:id", getRoleHandler);

// @desc Update a role
// @route PUT /api/{version}/roles/:id
// public
router.put("/:id", updateRoleHandler);

// @desc Delete a role
// @route DELETE /api/{version}/roles/:id
// public
router.delete("/:id", deleteRoleHandler);

module.exports = router;
