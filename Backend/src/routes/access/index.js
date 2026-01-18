const epxress = require("express");
const accessController = require("../../controllers/access.controller");
const router = epxress.Router();

router.post("/shop/signup", accessController.Signup);

module.exports = router;
