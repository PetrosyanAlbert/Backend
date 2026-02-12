const router = require("express").Router();
const orderController = require("../controllers/order.controller");

router.get("/orders/:id", orderController.getById);
router.get("/users/:id/orders", orderController.getByUser);
router.post("/orders", orderController.create);
router.post("/orders/:id/items", orderController.addItem);
router.patch("/orders/:id/status", orderController.updateStatus);

module.exports = router;
