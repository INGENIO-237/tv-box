const {
  getAllRequestsHandler,
  createRequestHandler,
  getRequestHandler,
  updateRequestHandler,
  deleteRequestHandler,
} = require("../controllers/request");

const router = require("express").Router();

// @desc Get all requests
// @route GET /api/{version}/requests
// private
router.get("/", getAllRequestsHandler);

// @desc Create a request
// @route POST /api/{version}/requests
// private
router.post("/", createRequestHandler);

// @desc Get a request
// @route GET /api/{version}/requests/:id
// private
router.get("/:id", getRequestHandler);

// @desc Update a request
// @route PUT /api/{version}/requests/:id
// private
router.put("/:id", updateRequestHandler);

// @desc Delete a request
// @route DELETE /api/{version}/requests/:id
// private
router.delete("/:id", deleteRequestHandler);

module.exports = router;
