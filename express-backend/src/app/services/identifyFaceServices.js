"use strict";
const bcrypt = require("bcryptjs");

const { BadRequestResponse } = require("../../cors/error.response");
const pgInit = require("../../inits/pgInit");
const TokenHelpers = require("../../helpers/tokenHelpers");

class IdentifyFaceServices {
  static async register(req, __) {
    const { username, password, faceData } = req.body;

    if ((username, faceData)) {
      throw new BadRequestResponse();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pgInit.getPool.query(
      "INSERT INTO users (username, password, face_data) VALUES ($1, $2, $3) RETURNING *",
      [username, hashedPassword, faceData]
    );

    if (!result.rows[0]) {
      throw new BadRequestResponse();
    }

    const token = TokenHelpers.generateToken(result.rows[0]);

    if (!token) {
      throw new BadRequestResponse();
    }

    return token;
  }

  static async login(req, res) {}
}

module.exports = IdentifyFaceServices;
