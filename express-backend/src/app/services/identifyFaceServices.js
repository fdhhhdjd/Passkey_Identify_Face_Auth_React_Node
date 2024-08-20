"use strict";

const faceapi = require("@vladmandic/face-api");
const { v4: uuidv4 } = require("uuid");
require("@tensorflow/tfjs-node");

const { BadRequestResponse } = require("../../cors/error.response");
const pgInit = require("../../inits/pgInit");
const SessionHelpers = require("../../helpers/sessionHelpers");
const CookieHelpers = require("../../helpers/cookieHelpers");
const cookieConstants = require("../../constants/cookieConstants");
const db = require("../../data/dummy/db");

class IdentifyFaceServices {
  static async register(req, __) {
    const { email, faceData } = req.body;

    if (!email && !faceData) {
      throw new BadRequestResponse();
    }

    const result = await pgInit
      .getPool()
      .query(
        "INSERT INTO users (email, face_data) VALUES ($1, $2) RETURNING *",
        [email, faceData]
      );

    if (!result.rows[0]) {
      throw new BadRequestResponse();
    }

    return result.rows[0] || {};
  }

  static async login(req, res) {
    const { email, faceData } = req.body;

    if (!email && !faceData) throw new BadRequestResponse();

    const result = await pgInit
      .getPool()
      .query("SELECT * FROM users WHERE email = $1", [
        "nguyentientai9@gmail.com",
      ]);

    if (result.rows.length === 0) throw new BadRequestResponse();

    const user = result.rows[0];

    // Face recognition
    const storedFaceData = new Float32Array(
      Object.values(JSON.parse(user.face_data))
    );
    const queryFaceData = new Float32Array(Object.values(JSON.parse(faceData)));
    const distance = faceapi.euclideanDistance(storedFaceData, queryFaceData);

    if (distance > 0.6)
      throw new BadRequestResponse({
        message: "Face not recognized",
      });

    const tempSessionId = uuidv4();

    if (!tempSessionId) {
      throw new BadRequestResponse();
    }

    const userSession = db.users.find(
      (user) => user.email === result.rows[0].email
    );
    console.log(userSession);

    if (!userSession) {
      throw new BadRequestResponse();
    }

    SessionHelpers.setUser(tempSessionId, userSession);

    CookieHelpers.saveCookie(res, cookieConstants.LOGIN, tempSessionId);

    return {
      id: user.id,
      email: user.email,
      session: tempSessionId,
    };
  }
}

module.exports = IdentifyFaceServices;
