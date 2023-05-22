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

// acess token verification middleware
router.use(accessVerification);

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
router.get("/:id", checkId, getObjectHandler);

// @desc Update a object
// @route PUT /api/{version}/objects/:id
// private
router.put("/:id", checkId, updateObjectHandler);

// @desc Delete a object
// @route DELETE /api/{version}/objects/:id
// private
router.delete("/:id", checkId, deleteObjectHandler);

// @desc Get all requests of an object
// @route GET /api/{version}/objects/:id/requests
// private
router.get("/:id/requests", checkId, getObjetRequestsHandler);

module.exports = router;
