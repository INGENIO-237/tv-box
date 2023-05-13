const {
  getAllRequests,
  createRequest,
  getRequest,
  updateRequest,
  deleteRequest,
} = require("../controllers/request");

const router = require("express").Router();

// @desc Get all requests
// @route GET /api/{version}/requests
// public
router.get("/", getAllRequests);

// @desc Create a request
// @route POST /api/{version}/requests
// public
router.post("/", createRequest);

// @desc Get a request
// @route GET /api/{version}/requests/:id
// public
router.get("/:id", getRequest);

// @desc Update a request
// @route PUT /api/{version}/requests/:id
// public
router.put("/:id", updateRequest);

// @desc Delete a request
// @route DELETE /api/{version}/requests/:id
// public
router.delete("/:id", deleteRequest);

module.exports = router;
