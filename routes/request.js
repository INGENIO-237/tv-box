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
// public
router.get("/", getAllRequestsHandler);

// @desc Create a request
// @route POST /api/{version}/requests
// public
router.post("/", createRequestHandler);

// @desc Get a request
// @route GET /api/{version}/requests/:id
// public
router.get("/:id", getRequestHandler);

// @desc Update a request
// @route PUT /api/{version}/requests/:id
// public
router.put("/:id", updateRequestHandler);

// @desc Delete a request
// @route DELETE /api/{version}/requests/:id
// public
router.delete("/:id", deleteRequestHandler);

module.exports = router;
