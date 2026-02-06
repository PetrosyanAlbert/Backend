const router = require("express").Router();
const controller = require("../controllers/accounts.controller");

router.get("/:id", controller.getAccountById);
router.post("/", controller.createAccount);
router.post("/:id/deposit", controller.deposit);
router.patch("/:id/status", controller.updateStatus);

module.exports = router;
