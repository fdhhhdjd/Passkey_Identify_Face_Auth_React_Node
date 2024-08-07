"use strict";

const reasonPhrases = require("../utils/codes/reasonPhrases");
const statusCodes = require("../utils/codes/statusCodes");

class SuccessResponse {
  constructor({ message, status, metadata = {} }) {
    this.status = status;
    this.message = message;
    this.metadata = metadata;
  }

  send(res) {
    return res.status(this.status).send(this);
  }
}

class Ok extends SuccessResponse {
  constructor({
    status = statusCodes.OK,
    message = reasonPhrases.OK,
    metadata = {},
  } = {}) {
    super({ message, status, metadata });
  }
}

class Created extends SuccessResponse {
  constructor({
    status = statusCodes.CREATED,
    message = reasonPhrases.CREATED,
    metadata = {},
  } = {}) {
    super({ message, status, metadata });
  }
}

module.exports = {
  Ok,
  Created,
};
