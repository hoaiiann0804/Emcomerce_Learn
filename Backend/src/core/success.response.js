"use strict";
const StatusCode = {
  OK: 200,
  CREATED: 201,
};

const ResonStatusCode = {
  CREATED: "Created",
  OK: "Success",
};

class SucessResponse {
  constructor({
    message,
    statusCode = StatusCode.OK,
    resonStatusCode = ResonStatusCode.OK,
    metadata = {},
  }) {
    this.message = !message ? resonStatusCode : message;
    this.status = statusCode;
    this.metadata = metadata;
  }
  send(res, headers = {}) {
    return res.status(this.status).json(this);
  }
}

class OK extends SucessResponse {
  constructor({ message, metadata }) {
    super({message, metadata});
  }
}

class CREATED extends SucessResponse {
  constructor({
    options={},
    message,
    statusCode = StatusCode.CREATED,
    resonStatusCode = ResonStatusCode.CREATED,
    metadata = {},
  }) {
    super({ message, statusCode, resonStatusCode, metadata});
    this.options = options
  }
}
module.exports = {
  OK,
  CREATED,
};
