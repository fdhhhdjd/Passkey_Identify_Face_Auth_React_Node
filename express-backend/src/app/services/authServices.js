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
      throw new BadRequestResponse();
    }

    const tempSessionId = uuidv4();

    if (!tempSessionId) {
      throw new BadRequestResponse();
    }

    SessionHelpers.setUser(tempSessionId, user);

    CookieHelpers.saveCookie(res, cookieConstants.LOGIN, tempSessionId);

    return {
      id: user.id,
      email: user.email,
      session: tempSessionId,
    };
  }

  static async logout(req, res) {
    const sessionId = req.cookies[cookieConstants.LOGIN];

    if (!sessionId) {
      throw new BadRequestResponse();
    }

    SessionHelpers.clearUserSession(sessionId);

    CookieHelpers.clearCookieByKey(res, {
      key: cookieConstants.LOGIN,
    });

    return sessionId;
  }
}

module.exports = AuthServices;
