"use strict";

const { v4: uuidv4 } = require("uuid");

const cookieConstants = require("../../constants/cookieConstants");
const { BadRequestResponse } = require("../../cors/error.response");
const db = require("../../data/dummy/db");
const CookieHelpers = require("../../helpers/cookieHelpers");
const SessionHelpers = require("../../helpers/sessionHelpers");

class AuthServices {
  static async login(req, res) {
    const { email, password } = req.body;

    const user = db.users.find((user) => user.email === email);

    if (!user || user.password !== password) {
      throw new BadRequestResponse({
        message: "Invalid username or password",
      });
    }

    const tempSessionId = uuidv4();

    if (!tempSessionId) {
      throw new BadRequestResponse();
    }

    SessionHelpers.setUserTempSession(tempSessionId, user);

    CookieHelpers.saveCookie(res, cookieConstants.LOGIN, tempSessionId);

    return user;
  }

  static async logout() {
    return {};
  }
}

module.exports = AuthServices;
