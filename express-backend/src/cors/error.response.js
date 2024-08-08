"use strict";

const reasonPhrases = require("../utils/codes/reasonPhrases");
const statusCodes = require("../utils/codes/statusCodes");

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.timestamp = new Date().toISOString();
  }
}

class BadRequestResponse extends ErrorResponse {
  constructor({
    message = reasonPhrases.BAD_REQUEST,
    status = statusCodes.BAD_REQUEST,
  } = {}) {
    super(message, status);
  }
}

class NotFoundError extends ErrorResponse {
  constructor({
    message = reasonPhrases.NOT_FOUND,
    status = statusCodes.NOT_FOUND,
  } = {}) {
    super(message, status);
  }
}

class UnauthorizedError extends ErrorResponse {
  constructor({
    message = reasonPhrases.UNAUTHORIZED,
    status = statusCodes.UNAUTHORIZED,
  } = {}) {
    super(message, status);
  }
}

module.exports = {
  BadRequestResponse,
  NotFoundError,
  UnauthorizedError,
};
