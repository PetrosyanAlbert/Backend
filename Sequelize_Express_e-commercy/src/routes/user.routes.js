const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.get("/users", userController.getAll);
router.get("/users/:id", userController.getById);
router.post("/users", userController.create);

module.exports = router;
