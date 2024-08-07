"use strict";

const { NotFoundError } = require("../cors/error.response");
const statusCodes = require("../utils/codes/statusCodes");
const reasonPhrases = require("../utils/codes/reasonPhrases");

class ErrorHandler {
  static notFoundHandler(_, __, next) {
    const error = new NotFoundError();
    next(error);
  }

  static errorHandler(error, __, res, ____) {
    const statusCode = error.status || statusCodes.INTERNAL_SERVER_ERROR;
    const errorCode = error.code || statusCodes.INTERNAL_SERVER_ERROR;
    const errorMessage = error.message || reasonPhrases.INTERNAL_SERVER_ERROR;

    const response = {
      status: statusCode,
      message: errorMessage,
    };
    if (process.env.NODE_ENV === "dev") {
      response.stack = error.stack;
    }

    return res.status(statusCode).json(response);
  }
}

module.exports = ErrorHandler;
