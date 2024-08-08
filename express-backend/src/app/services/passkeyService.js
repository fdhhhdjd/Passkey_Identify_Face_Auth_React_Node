"use strict";

const { BadRequestResponse } = require("../../cors/error.response");
const PasskeyHelpers = require("../../helpers/passkeyHelpers");

class PassKeyServices {
  static async registerPasskey(req, __) {
    const { id } = req.user;
    const { start, finish, credential } = req.body;

    if (start) {
      const createOptions = await PasskeyHelpers.startServerPasskeyRegistration(
        id
      );
      console.log("registration start...");
      return createOptions;
    } else if (finish) {
      const resultFinish = await PasskeyHelpers.finishServerPasskeyRegistration(
        credential
      );
      console.log("registration finish ✅");
      return resultFinish;
    }

    throw new BadRequestResponse();
  }
}

module.exports = PassKeyServices;
