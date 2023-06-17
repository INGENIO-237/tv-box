const {
  getAllObjectsHandler,
  createObjectHandler,
  getObjectHandler,
  updateObjectHandler,
  deleteObjectHandler,
  getObjetRequestsHandler,
} = require("../controllers/object");

const accessVerification = require("../middlewares/tokenVerification");
const checkId = require("../middlewares/check-id");

const router = require("express").Router();

// @desc Get all objects
// @route GET /api/{version}/objects
// private
router.get("/", getAllObjectsHandler);

// @desc Create a object
// @route POST /api/{version}/objects
// private
router.post("/", accessVerification, createObjectHandler);

// @desc Get a object
// @route GET /api/{version}/objects/:id
// private
router.get("/:id", accessVerification, checkId, getObjectHandler);

// @desc Update a object
// @route PUT /api/{version}/objects/:id
// private
router.put("/:id", accessVerification, checkId, updateObjectHandler);

// @desc Delete a object
// @route DELETE /api/{version}/objects/:id
// private
router.delete("/:id", accessVerification, checkId, deleteObjectHandler);

// @desc Get all requests of an object
// @route GET /api/{version}/objects/:id/requests
// private
router.get("/:id/requests", accessVerification, checkId, getObjetRequestsHandler);

module.exports = router;
