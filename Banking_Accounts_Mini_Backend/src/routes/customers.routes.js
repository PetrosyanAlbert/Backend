const router = require("express").Router();
const controller = require("../controllers/customers.controller");

router.post("/", controller.createCustomer);
router.get("/:id", controller.getCustomerById);

module.exports = router;
