const router = require("express").Router();
const productController = require("../controllers/product.controller");

router.get("/products", productController.getAll);
router.post("/products", productController.create);
router.patch("/products/:id", productController.update);

module.exports = router;
