const {
  getAllObjects,
  createObject,
  getObject,
  updateObject,
  deleteObject,
} = require("../controllers/object");

const router = require("express").Router();

// @desc Get all objects
// @route GET /api/{version}/objects
// public
router.get("/", getAllObjects);

// @desc Create a object
// @route POST /api/{version}/objects
// public
router.post("/", createObject);

// @desc Get a object
// @route GET /api/{version}/objects/:id
// public
router.get("/:id", getObject);

// @desc Update a object
// @route PUT /api/{version}/objects/:id
// public
router.put("/:id", updateObject);

// @desc Delete a object
// @route DELETE /api/{version}/objects/:id
// public
router.delete("/:id", deleteObject);

module.exports = router;