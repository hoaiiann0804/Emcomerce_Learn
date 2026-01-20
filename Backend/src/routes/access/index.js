const epxress = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const router = epxress.Router();

router.post("/shop/signup", asyncHandler(accessController.Signup));
router.post("/shop/signin", asyncHandler(accessController.Signin));

module.exports = router;
