const asyncHandler = require("express-async-handler");

const getAllRoles = asyncHandler(async (req, res) =>{
    res.status(200).json({ message: "Get all roles" });
});

const getRole = asyncHandler(async (req, res) =>{
    res.status(200).json({ message: "Get single role" });
});

const createRole = asyncHandler(async (req, res) =>{
    res.status(201).json({ message: "Create a role" });
});

const updateRole = asyncHandler(async (req, res) =>{
    res.status(204).json({ message: "Update role" });
});

const deleteRole = asyncHandler(async (req, res) =>{
    res.status(200).json({ message: "Delete role" });
});

module.exports = { getAllRoles, getRole, createRole, updateRole, deleteRole };