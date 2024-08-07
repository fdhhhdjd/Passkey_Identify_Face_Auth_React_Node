"use strict";

const statusCodes = require("../utils/codes/statusCodes");

class SuccessResponse {
  constructor({ message, status, metadata = {} }) {
    this.message = message;
    this.status = status;
    this.metadata = metadata;
  }

  send(res) {
    return res.status(this.status).send(this);
  }
}

class Ok extends SuccessResponse {
  constructor({ message, status = statusCodes.OK, metadata = {} } = {}) {
    super({ message, status, metadata });
  }
}

class Created extends SuccessResponse {
  constructor({ message, status = statusCodes.CREATED, metadata = {} } = {}) {
    super({ message, status, metadata });
  }
}

module.exports = {
  Ok,
  Created,
};
