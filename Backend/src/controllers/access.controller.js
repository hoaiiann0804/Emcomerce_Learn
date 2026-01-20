"use strict";

const { CREATED } = require("../core/success.response");
const AccessService = require("../services/access.service");

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
} 
module.exports = new AccessController();
