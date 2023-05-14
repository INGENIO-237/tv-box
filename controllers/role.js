const asyncHandler = require("express-async-handler");

const getAllRolesHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all roles" });
});

const getRoleHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get single role" });
});

const createRoleHandler = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Create a role" });
});

const updateRoleHandler = asyncHandler(async (req, res) => {
  res.status(204).json({ message: "Update role" });
});

const deleteRoleHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete role" });
});

module.exports = {
  getAllRolesHandler,
  getRoleHandler,
  createRoleHandler,
  updateRoleHandler,
  deleteRoleHandler,
};
