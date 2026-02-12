const router = require("express").Router();

router.use(require("./user.routes"));
router.use(require("./product.routes"));
router.use(require("./order.routes"));

module.exports = router;
