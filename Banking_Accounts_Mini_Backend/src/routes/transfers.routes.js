const router = require("express").Router();
const controller = require("../controllers/transfers.controller");

router.post("/", controller.transfer);

module.exports = router;
