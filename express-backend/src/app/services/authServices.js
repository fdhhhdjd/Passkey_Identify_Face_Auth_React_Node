"use strict";

const { v4: uuidv4 } = require("uuid");

const cookieConstants = require("../../constants/cookieConstants");
const { BadRequestResponse } = require("../../cors/error.response");
const db = require("../../data/dummy/db");
const CookieHelpers = require("../../helpers/cookieHelpers");
const SessionHelpers = require("../../helpers/sessionHelpers");
const passkeyHelpers = require("../../helpers/passkeyHelpers");
const JwtHelpers = require("../../helpers/jwt");

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

  static async handleMfaLogin(req, res) {
    const { start, finish, options, id } = req.body;

    const userID = id;
    console.log("userIDfromMFALogin", userID);

    if (!userID) {
      console.error("MFA Login not allowed");
      throw new BadRequestResponse();
    }

    if (start) {
      const loginOptions = await passkeyHelpers.startMfaLogin(userID);
      console.log("MFA LOGIN START", loginOptions);
      return loginOptions;
    }

    if (finish) {
      const jwtToken = await passkeyHelpers.finishMfaLogin(userID, options);

      console.log("jwtToken", jwtToken);

      const newUserID = await JwtHelpers.extractUserID(jwtToken?.token ?? "");
      console.log("userID from hanko", newUserID);

      const user = db.users.find((user) => user.id === userID);
      if (!user) {
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
  }

  static async handlePasskeyLogin(req, res) {
    const { start, finish, options } = req.body;

    if (start) {
      const loginOptions = await passkeyHelpers.startServerPasskeyLogin();
      return loginOptions;
    }
    if (finish) {
      const jwtToken = await passkeyHelpers.finishServerPasskeyLogin(options);

      const userID = await JwtHelpers.extractUserID(jwtToken?.token ?? "");
      console.log("userID from hanko", userID);

      const user = db.users.find((user) => user.id === userID);
      if (!user) {
        throw new BadRequestResponse();
      }
      console.log("user", user);

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
  }

  static async logout(req, res) {
    const sessionId = req.cookies[cookieConstants.LOGIN];

    console.log(req.cookies);

    console.log(sessionId);

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
