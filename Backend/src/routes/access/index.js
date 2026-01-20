const epxress = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const router = epxress.Router();

router.post("/shop/signup", asyncHandler(accessController.Signup));

module.exports = router;
