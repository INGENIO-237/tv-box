const {
  getAllRequestsHandler,
  createRequestHandler,
  getRequestHandler,
  updateRequestHandler,
  deleteRequestHandler,
} = require("../controllers/request");

const accessVerification = require("../middlewares/tokenVerification");

const router = require("express").Router();

// @desc Get all requests
// @route GET /api/{version}/requests
// private
router.get("/", accessVerification, getAllRequestsHandler);

// @desc Create a request
// @route POST /api/{version}/requests
// public
router.post("/", createRequestHandler);

// @desc Get a request
// @route GET /api/{version}/requests/:id
// private
router.get("/:id", accessVerification, getRequestHandler);

// @desc Delete a request
// @route DELETE /api/{version}/requests/:id
// private
router.delete("/:id", accessVerification, deleteRequestHandler);

module.exports = router;
