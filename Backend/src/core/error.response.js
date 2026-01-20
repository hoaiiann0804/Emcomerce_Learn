"use strict";

const { ReasonPhrases, StatusCodes } = require("../utils/httpStatusCode");

const StatusCode = {
  FORBIDDEN: 403,
  CONFLIT: 409,
  BAD: 400,
};
const ResonStatusCode = {
  FORBIDDEN: "Forbidden Error",
  CONFLIT: "Conflit error",
  BAD: "Bad Request",
};
class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
class ConflictRequestError extends ErrorResponse {
  constructor(
    message = ResonStatusCode.CONFLIT,
    statusCode = StatusCode.CONFLIT
  ) {
    super(message, statusCode);
  }
}
class ForbiddenError extends ErrorResponse {
  constructor(
    message = ResonStatusCode.FORBIDDEN,
    statusCode = StatusCode.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message = ResonStatusCode.BAD, statusCode = StatusCode.BAD) {
    super(message, statusCode);
  }
}

class AuthFailureError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.UNAUTHORIZED,
    statusCode = StatusCodes.UNAUTHORIZED
  ) {
    super(message, statusCode);
  }
}
module.exports = {
  ConflictRequestError,
  ForbiddenError,
  BadRequestError,
  AuthFailureError,
};
