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
// private
router.get("/", getAllObjectsHandler);

// @desc Create a object
// @route POST /api/{version}/objects
// private
router.post("/", createObjectHandler);

// @desc Get a object
// @route GET /api/{version}/objects/:id
// private
router.get("/:id", getObjectHandler);

// @desc Update a object
// @route PUT /api/{version}/objects/:id
// private
router.put("/:id", updateObjectHandler);

// @desc Delete a object
// @route DELETE /api/{version}/objects/:id
// private
router.delete("/:id", deleteObjectHandler);

// @desc Get all requests of an object
// @route GET /api/{version}/objects/:id/requests
// private
router.get("/:id/requests", getObjetRequestsHandler);

module.exports = router;
