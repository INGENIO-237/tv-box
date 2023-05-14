const {
  getAllObjectsHandler,
  createObjectHandler,
  getObjectHandler,
  updateObjectHandler,
  deleteObjectHandler,
  getObjetRequestsHandler,
} = require("../controllers/object");

const router = require("express").Router();

// @desc Get all objects
// @route GET /api/{version}/objects
// public
router.get("/", getAllObjectsHandler);

// @desc Create a object
// @route POST /api/{version}/objects
// public
router.post("/", createObjectHandler);

// @desc Get a object
// @route GET /api/{version}/objects/:id
// public
router.get("/:id", getObjectHandler);

// @desc Update a object
// @route PUT /api/{version}/objects/:id
// public
router.put("/:id", updateObjectHandler);

// @desc Delete a object
// @route DELETE /api/{version}/objects/:id
// public
router.delete("/:id", deleteObjectHandler);

// @desc Get all requests of an object
// @route GET /api/{version}/objects/:id/requests
// public
router.get("/:id/requests", getObjetRequestsHandler);

module.exports = router;
