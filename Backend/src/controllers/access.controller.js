"use strict";

const { CREATED, SucessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");
const { OK } = require("../utils/statusCode");

class AccessController {
  Signup = async (req, res, next) => {
    new CREATED({
      message: "Registered Successfull !",
      metadata: await AccessService.SignUp(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
  };
  Signin = async (req, res, next) => {
    new SucessResponse({
      metadata: await AccessService.SignIn(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
  };
}
module.exports = new AccessController();
