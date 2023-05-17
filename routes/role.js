const {
  getAllRolesHandler,
  createRoleHandler,
  getRoleHandler,
  updateRoleHandler,
  deleteRoleHandler,
} = require("../controllers/role");

const accessVerification = require("../middlewares/tokenVerification");

const router = require("express").Router();

// Access token verification middleware
router.use(accessVerification);

// @desc Get all roles
// @route GET /api/{version}/roles
// private
router.get("/", getAllRolesHandler);

// @desc Create a role
// @route POST /api/{version}/roles
// private
router.post("/", createRoleHandler);

// @desc Get a role
// @route GET /api/{version}/roles/:id
// private
router.get("/:id", getRoleHandler);

// @desc Update a role
// @route PUT /api/{version}/roles/:id
// private
router.put("/:id", updateRoleHandler);

// @desc Delete a role
// @route DELETE /api/{version}/roles/:id
// private
router.delete("/:id", deleteRoleHandler);

module.exports = router;
