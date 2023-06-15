const {
  createPartnerRequest,
  getPartnerRequestList,
} = require("../controllers/partner");

const router = require("express").Router();

router.get("/", getPartnerRequestList);
router.post("/", createPartnerRequest);

module.exports = router;
