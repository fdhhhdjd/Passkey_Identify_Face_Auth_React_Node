"use strict";
const bcrypt = require("bcryptjs");
const faceapi = require("@vladmandic/face-api");
require("@tensorflow/tfjs-node");

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

    const result = await pgInit
      .getPool()
      .query(
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

  static async login(req, res) {
    const { username, password, faceData } = req.body;

    if ((username, faceData)) throw new BadRequestResponse();

    const result = await pgInit
      .getPool()
      .query("SELECT * FROM users WHERE username = $1", [username]);
    if (result.rows.length === 0) throw new BadRequestResponse();

    const user = result.rows[0];

    // Face recognition
    const storedFaceData = new Float32Array(
      Object.values(JSON.parse(user.face_data))
    );
    const queryFaceData = new Float32Array(Object.values(JSON.parse(faceData)));
    const distance = faceapi.euclideanDistance(storedFaceData, queryFaceData);
  }
}

module.exports = IdentifyFaceServices;
